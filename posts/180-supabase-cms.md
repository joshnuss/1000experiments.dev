---
title: Supabase CMS
experiment: 180
date: "2021-05-10"
permalink: supabase-cms
tags: supabase, svelte, idea, cms
---

Was thinking a bit about how a CMS could work with supabase.

One approach is to use a code generator.

All you'd need is a list of fields, and the code generator would do a bunch of work for you, like:

- Generating the SQL to create the tables.
- Adding the primary keys, foreign keys and common fields, like `id`, `user_id`, `status`, `inserted_at`, `updated_at`, `published_at`.
- Generating the security policies. Only `published` data should be accessible to the public, while creating and updating would require authentication.
- Adding a trigger to set the `updated_at` timestamp.
- Adding a `*_versions` table and a trigger to capture each change.

We also get a few things for free:

- The content is accessible via the standard supabase API, ie `await supabase.from('table_name').select('*')`. So no special API is needed.
- It notifies whenever something changes via supabase's `realtime` API.

In the future, it could provide:

- A visual editor for doing CRUD, publishing, scheduling, and archiving.
- A way to migrate the DB automatically, without copy & paste.
- The ability to Attach files to rows using [Supabase Storage](https://supabase.io/storage).

## Code

https://svelte.dev/repl/58ad718676504e558f4a893e2ac050af?version=3.38.2

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1620620049/1000experiments.dev/supabase-cms_yraijh.mp4"/>

## Notes

- Add default values for fields.
- When `scheduled_at` is set, and `status = 'scheduled'` a CRON job should run to mark the post `published`, that will trigger realtime updates.
- Should it support field validations?
