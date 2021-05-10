---
title: Supabase CMS
experiment: 180
date: "2021-05-10"
permalink: supabase-cms
tags: supabase, svelte, idea
---

This is a rough idea.

I was thinking how a CMS would work with supabase, and it turns out to be a pretty good idea. It can provide most of what Contentful does for free/much lower cost.

All you need to is a list of fields, and it does the rest to build the CMS:

- Generates the SQL to create the tables for you.
- It adds all the primary keys, foreign keys and common fields, like `id`, `user_id`, `status`, `inserted_at`, `updated_at`, `publish_at`.
- It generates all the policies. Only `published` data is accessibly by the public, created and updating requires authentication.
- Adds a trigger to set the timestamps.
- Adds a `*_versions` table to log each change made to the record.
- Content is accessible via the standard Supabase API, ie `supabase.from('posts').select('*')`.
- It notifies whenever things change via supabase's `realtime` API.
- Future: provide a visual editor for doing CRUD.
- Future: migrate the DB automatically, no need for copy & paste.
- Future: attach files to rows, using [Supabase Storage](https://supabase.io/storage).

## Code

https://svelte.dev/repl/58ad718676504e558f4a893e2ac050af?version=3.38.2

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1620620049/1000experiments.dev/supabase-cms_yraijh.mp4"/>

## Notes

- Add default values
- When `publish_at` is set, and `status = 'scheduled'` a CRON job should run to mark the post `published`, that will trigger realtime updates.
