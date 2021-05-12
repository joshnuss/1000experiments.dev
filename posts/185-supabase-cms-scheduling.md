---
title: "Supabase CMS: Content scheduling"
experiment: 185
date: "2021-05-12"
permalink: supabase-cms-scheduling
tags: supabase, sql
---

Sometimes you want to publish content at a later time. So I built the concept into the [CMS data model generator](/posts/supabase-cms).
j
Each table has a `status` field, that can be one of:

- `draft`: this is the default state, it means the content is not publicly accessible.
- `published`: the content is available to the public.
- `scheduled`: the content will be available later. It is not available to the public until the date/time specified in the `scheduled_at` column has passed. Then it will be marked published.
- `archived`: no longer available to the public

The way we transition a record from `status = 'scheduled'` to `status = 'published'` is via a cron job that runs every 5 minutes.

[More info about pg_cron](https://supabase.io/blog/2021/03/05/postgres-as-a-cron-server)

## Code

It took very little code to accomplish:

```sql
-- enable pg_cron extension
create extension if not exists pg_cron;

-- check for scheduled posts every 5 minutes
select cron.schedule('publish-scheduled-posts', '*/5 * * * *', $$
  update posts
    set status = 'published', published_at = now()
      where status = 'scheduled' and scheduled_at >= now()
$$)
```

I've updated the code here:

https://svelte.dev/repl/58ad718676504e558f4a893e2ac050af?version=3.38.2
