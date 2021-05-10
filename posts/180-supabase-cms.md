---
title: Supabase CMS
experiment: 180
date: "2021-05-10"
permalink: supabase-cms
tags: supabase, svelte, idea
---

This is a rough idea.

I was thinking how a CMS would work with supabase. One approach is to use a code generator. It would provide most of what Contentful.

All you'd need is a list of fields, and the code generator would do the rest :

- Generate the SQL to create the tables.
- Adds the primary keys, foreign keys and common fields, like `id`, `user_id`, `status`, `inserted_at`, `updated_at`, `publish_at`.
- Generate the policies. Only `published` data would be accessible to the public. Creating and updating would require authentication.
- Adds a trigger to set the `updated_at` timestamp.
- Adds a `*_versions` table to log each change.
- Content is accessible via the standard Supabase API, ie `await supabase.from('posts').select('*')`.
- It notifies whenever things change via supabase's `realtime` API.
- Future: provide a visual editor for doing CRUD, publishing, scheduling and archiving.
- Future: migrate the DB automatically, no need for copy & paste.
- Future: attach files to rows using [Supabase Storage](https://supabase.io/storage).

## Code

https://svelte.dev/repl/58ad718676504e558f4a893e2ac050af?version=3.38.2

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1620620049/1000experiments.dev/supabase-cms_yraijh.mp4"/>

## Notes

- Add default values for fields.
- When `scheduled_at` is set, and `status = 'scheduled'` a CRON job should run to mark the post `published`, that will trigger realtime updates.
