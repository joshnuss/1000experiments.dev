---
title: "Svelte-kit supabase preset: environment vars"
experiment: 114
date: "2021-04-09"
permalink: svelte-kit-supabase-preset-3
tags: svelte, supabase
---

I updated the svelte-kit/supabase preset to run `yarn`/`npm`/`pnpm`.
It also now has a `--local` option, which allows the `.env` file to be filled in automatically, since the local creds are [all hardcoded](https://github.com/supabase/cli/blob/dcc8ab4372dd6b0131521ba4d8a26d1250cc464f/src/commands/init.ts#L53-L56).

I wasn't able to run `npx supabase init` from within the preset, because the supabase cli is interactive and asks some questions, so it needs `stdin`. Will have to look into doing it another way or just leaving it up to the userto run `supabase init`, it's optional anyways.

## Code

https://github.com/joshnuss/svelte-supabase/commit/6fd73fcfec7e05df0587f8f8e2692c96910e9fe7

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1617947438/1000experiments.dev/svelte-add-supabase_uafhjj.mp4"/>
