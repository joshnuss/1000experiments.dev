---
title: "Supabase + SvelteKit + GitPod template #2"
experiment: 146
date: "2021-04-20"
permalink: supabase-svelte-kit-gitpod-2
tags: supabase, svelte, gitpod
---

In the [last experiment](/posts/supabase-svelte-kit-gitpod), I setup a template for running supabase + svelte-kit on GitPod.

The one setup task required is providing environment variables.

Normally, you would define them in `.env` file on the file system. With GitPod, everything the projects file system will be get shared in snapshots.

GitPod provides a more secure approach, allowing environment variables to be defined on your user account, in the Settings / Variables screen, or with the cli tool `gp env`.

## Automating

To make it clear this needs to set up before running `npm run dev`. I updated the `init` command in  `.gitpod.yml` to check if the environment vars are configured before running the dev server. It also displays setup instructions when they're missing.

## Code

```yaml
tasks:
  - init: npm install
    command: |
      (
        RED='\033[0;31m'
        BOLD='\033[1;30m'
        NC='\033[0m' # No Color

        # check if VITE_SUPABASE_URL is defined
        gp env | grep --quiet VITE_SUPABASE_URL

        # check if return value is 1
        if [ $? -eq 1 ]
        then
          # print error and setup instructions
          printf "${RED}Missing environment variables for supabase.${NC}\n\n"
          printf "To configure them:\n\n1. run: ${BOLD}gp env -e VITE_SUPABASE_URL=your_supabase_url VITE_SUPABASE_ANON_KEY=your_supabase_anon_key${NC}\n2. close and re-open your workspace\n"
        else
          # environment vars are setup, so run dev server
          npm run dev
        fi
      )
```

## Demo

<img src="https://res.cloudinary.com/dzwnkx0mk/image/upload/v1618914107/1000experiments.dev/supabase-gitpod-setup-instructions_evwsgf.png" alt="setup instructions"/>
