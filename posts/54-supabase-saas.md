---
title: SaaS with Supabase
experiment: 54
date: "2021-03-17"
permalink: supabase-saas
tags: supabase, saas
---

I'm going to use [Supabase](https://supabase.io) for some SaaS style projects.

In supabase, tables can be protected with RLS (row-level security), typically to check if the user is an owner:

```sql
-- enable RLS
alter table products enable row level security;

-- add a policy
create policy "Can view own data." on products for select using (auth.uid() = id);
```

But what if want to check is the user has paid?

We can create a shadow `users` table to keep track of `active` users.
Why a shadow table? Because `auth.users` is controlled by Supabase, we should avoid clashing with that and keep our data in the `public` schema along with the rest of our data.

Here's how we shadow the users table:

```sql
-- create a public.users table
create table users (
  id uuid references auth.users not null primary key,
  active boolean not null default false
);

-- enable RLS
alter table users enable row level security;

-- add access policies
create policy "Can view own user data." on users for select using (auth.uid() = id);
create policy "Can update own user data." on users for update using (auth.uid() = id);
```

We'll also need a trigger to create a record in `public.users` anytime a record is added to `auth.users`:

```sql
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, active)
  values (new.id, false);
  
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

Now if we want restrict data to paid members only, we can check if `user.active` bit is enabled.

That's going to happen a lot, so let's create a reusable function we can use in all our policies:

```sql
create or replace function is_paid_member(uid uuid)
returns boolean as $$
declare is_paid boolean;
begin
  select active into is_paid from users where id = uid;
  return coalesce(is_paid, false);
end $$ language plpgsql stable security definer;
```

Here's how we'd use it:

Let's say only paid members can save their "favorite colors". Create a table to track that data with `user_id`, and let's add some policies. We'll check with `is_paid_member()` where appropriate. 

```sql
-- create table with restricted data
create table colors (
  id serial primary key,
  user_id uuid references users(id),
  value text not null
);

-- enable RLS
alter table colors enable row level security;

-- setup access policies
create policy "can read own data" on colors for select using (auth.uid() = user_id);
create policy "can insert own data when is a paid member" on colors for insert with check (auth.uid() = user_id and is_paid_member(user_id));
create policy "can update own data when is a paid member" on colors for update using (auth.uid() = user_id and is_paid_member(user_id));
create policy "can delete own data when is a paid member" on colors for delete using (auth.uid() = user_id and is_paid_member(user_id));
```

In this case, we allow unpaid members read access to their data, but insert, update & delete must be paid.

## Conclusion

Once we create a reusable `is_paid_member()` function, it's easy to restrict data. In the future, I'll look into flipping that bit thru Stripe.
