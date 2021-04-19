---
title: "Code animation: Database schema"
experiment: 144
date: "2021-04-19"
permalink: code-animation-database-schema
tags: code-video, svelte, supabase
---

The data will be stored in [supabase][https://supabase.io].

There will be 3 tables:

- `animations`: contains one record per animation
- `commands`: contains a log of commands that were executed to produce the animation
- `versions`: contains the version history of each animation

There will be 3 stored procs OR lambda functions:

- `execute`: executes a command, and store the command data in the `commands` table and a snapshot in the `versions` table.
- `undo`: undoes a command. updates the `animations` table, and stores a snapshot in the `versions` table.
- `redo`: redoes a command. updates the `animations` table, and stores a snapshot in the `versions` table.

## Animations table

- `id`: primary key
- `user_id`: references `auth.users`
- `name`: the name of the animation
- `pointer`: the index of the last command
- `data`: `jsonb`
- `inserted_at`
- `updated_at`

## Commands table

This table is insert-only

- `id`: primary key
- `animation_id`: references `animations`
- `user_id`: references `auth.users`
- `index`: a number that represents the count of changes
- `type`: the type of command
- `args`: the argumens for the command in `jsonb` format
- `previous`: any previous state that would needed to undo the command
- `inserted_at`

## Versions table

This table is insert-only

- `id`: primary key
- `animation_id`: references `animations`
- `user_id`: references `auth.users`
- `data`: a snapshot in `jsonb` format
- `inserted_at`

## Code

```sql
drop table if exists commands;
drop table if exists versions;
drop table if exists animations;

create table animations (
  id serial primary key,
  user_id uuid references auth.users not null default auth.uid(),
  name varchar not null,
  pointer bigint not null default 0,
  data jsonb default '{}'::jsonb,
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table commands (
  id serial primary key,
  user_id uuid references auth.users not null default auth.uid(),
  animation_id bigint references animations not null,
  index bigint not null,
  type varchar not null,
  args jsonb default '{}'::jsonb,
  previous jsonb default '{}'::jsonb,

  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table versions (
  id serial primary key,
  user_id uuid references auth.users not null default auth.uid(),
  animation_id bigint references animations not null,
  data jsonb default '{}'::jsonb,
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```
