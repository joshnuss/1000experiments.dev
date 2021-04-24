---
title: "Supabase SaaS: Project plan"
experiment: 151
date: "2021-04-23"
permalink: supabase-saas-plan
tags: saas, supabase, svelte
---

I'd like to create a SaaS template for [svelte-kit](https://kit.svelte.dev). There is already [something similar](https://github.com/vercel/nextjs-subscription-payments) with React/Next.js.

This would help me in a few ways:

- It's needed for the [code animation project](/tag/code-video).
- It would make it easy to create a paid video course, if I get there in the future.
- It provides a useful template for the community.

I've already done a few experiments in this area:

- [Plans](/posts/supabase-saas-plans)
- [Payment](/posts/supabase-sveltekit-stripe)
- [Cancelation](/posts/supabase-sveltekit-stripe-cancelations)
- [Payment Webhooks](/posts/supabase-svelte-stripe-webhooks)
- [Row-level-security helpers](/posts/supabase-saas)

So this post is about organizing this project, and seeing what's left before I start integration.

## Use Cases

As a user, I can view pricing, testimonials
As a user, I can signup and pay for a subsciption
As a member, I can view my payment history
As a member, I can cancel subsciption
As a member, I can upgrade/downgrade my plan
As a member, I can log out
As a member, I can view paid content
As a unpaid user, I cannot view paid content

## Sitemap

### Home page

Displays hero section, features, testimonials, pricing. Links to sign in and sign up.
**Path**: /

### Login page

Login page, probably using [svelte-ui-supabase](https://github.com/joshnuss/supabase-ui-svelte)
**Path**: /login

### Sign up page

Sign up page, similar to `/login`, but with extra fields
**Path**: /signup

### Dashboard page

This is a stub page, that shows how to protect a page from unpaid members:
**Path**: /dashboard

### Account page

A place when the customer can update info related to their account and initiate plan changes. For paid members only.
**Path**: /account

### Payments page

Shows the member their payment history
**Path**: /payments

## Schema

This is what the database schema will look like. There aren't too many pieces needed.

### plans table

- `id` primary key
- `name` varchar
- `features` jsonb
- `monthly_price` money
- `annual_price` money
- `monthly_price_id` stripe's price id
- `annual_price_id` stripe's price id

```sql
create table plans (
  id serial primary key,
  name varchar not null,
  features jsonb not null default '{}'::jsonb,
  monthly_price money not null,
  annual_price money,
  monthly_price_id varchar not null,
  annual_price_id varchar
)
```

### members table

- `id` uuid, references `auth.users`
- `paid` boolean, `true` when payment is in good standing, `false` when payment has failed or account is canceled.

```sql
-- create a public.users table
create table members (
  id uuid references auth.users not null primary key,
  active boolean not null default false
);

-- enable RLS
alter table members enable row level security;

-- add access policies
create policy "Can view own user data." on members for select using (auth.uid() = id);
create policy "Can update own user data." on members for update using (auth.uid() = id);
```

### is_paid_member function

This function makes it possible to check if a `user_id` is a paid member inside a policy check.

```sql
create or replace function is_paid_member(uid uuid)
returns boolean as $$
declare is_paid boolean;
begin
  select paid into is_paid from users where id = uid;
  return coalesce(is_paid, false);
end $$ language plpgsql stable security definer;
```

### handle_new_user function

This function is triggered when a user account is created.

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

## Functions

- `checkout` for making the initial payment
- `change-plan` when the member wants to upgrade/downgrade their plan
- `cancel-account` called to cancel the member's account
- `stripe-webhook-handler` handles webhooks from stripes, and updates the payment history or marks the member paid/unpaid

## Notes

- One of the challenges with templates is how much design do they have? There are 3 ways: Fully designed (custom css or tailwind), minimal design, no design. I wonder if it would be possible to ship 3 versions of the html in seperate folders, so the user can choose their starting point. or maybe it could be a separate branch.
- Should credit card info and sign up info be input on the same screen, or can we ask for CC as seperate page after they sign up (it would be easier to implement).
- Often there are rules on plans, like quotas (ie `max_videos_per_month`, `max_file_size`) or flags (ie `zapier_enabled`). Those can be fields in the `plans` tables, but they should probably be copied to `members` table too. Because if a plans rules changes down the road, you'd probably want previous customer agreements to be grandfathered in.
