---
title: "Supabase CMS: Localization"
experiment: 186
date: "2021-05-13"
permalink: supabase-cms-localization
tags: svelte, supabase, cms, sql
---

Continuing on from the [previous experiment](/posts/supabase-cms-scheduling), I added support for localizing content by language.

This introduces another table. For example, if we wanted to localize the `title` of a post, there would be a corresponding `post_locales` table that would hold the `title` (and any other fields we want localized).

Since I want to track versions of each change, it would mean having 2 versioning tables `post_versions` and `post_local_verions`. Instead, I refactored `post_versions` to store the history as a `jsonb` value so both data shapes can fit in the same table. Then I updated the trigger code to generate a json object. 

Here's what it looks like now:

```sql
-- create a function that will duplicate posts data into the posts_versions table
create or replace function log_post()
returns trigger as $$
begin
  insert into post_versions (post_id, user_id, payload)
    values (old.id, old.user_id, jsonb_build_object(
      'status', old.status,
      'published_at', old.published_at,
      'scheduled_at', old.scheduled_at,
      'archived_at', old.archived_at,
      'updated_at', old.updated_at,
      'permalink', old.permalink,
      'body', old.body,
      'tags', old.tags
	));
  return new;
end;
$$ language plpgsql;

-- create a function that will duplicate post_locales data into the posts_versions table
create or replace function log_post_locale()
returns trigger as $$
begin
  insert into post_versions (post_id, post_locale_id, user_id, payload)
    values (old.post_id, old.id, old.user_id, jsonb_build_object(
      'locale', old.locale,
      'updated_at', old.updated_at,
      'title', old.title
	));
  return new;
end;
$$ language plpgsql;
```

Worked pretty good!

## Code

https://svelte.dev/repl/42f6d1b0ced941fa97d0e35759dfba7e?version=3.38.2
