---
title: Supabase + SvelteKit + GitPod template
experiment: 145
date: "2021-04-19"
permalink: supabase-svelte-kit-gitpod
tags: supabase, svelte, gitpod
---

It's always good to have a template ready with the mix of technologies you use.

The other day I started using GitPod's [svelte-kit template](https://github.com/gitpod-io/sveltekit-example) and it's been pretty handy. I think supabase would be a perfect addition, since the database is remote. So I'm forking `svelte-kit-example` and adding supabase.

It should also be setup ready to do auth with [`supabase-ui-svelte`](https://github.com/joshnuss/supabase-ui-svelte).

## Setting up the template

First, I forked `gitpod-io/sveltekit-example` and changed the name to `supabase-sveltekit-example`:

```bash
# clone gitpod-io's repo
gh repo clone gitpod-io/sveltekit-example supabase-sveltekit-example
cd supabase-sveltekit-example

# rename origin to upstream, so we can merge changes
git remote rename origin upstream

# create the repo
gh repo create

# push to github
git push origin main
```

Then added supabase:

```bash
# install supabase template
npx svelte-add joshnuss/svelte-supabase

# convert .js to .ts
mv src/lib/db.js src/lib/db.ts
```

## Configuring the template

Added an example query inside `db.ts`:

```javascript
export const products = {
  async all() {
    const { data } = await supabase
      .from('products')
      .select('*')

    return data
  }
}
```

In `index.svelte`, `db.ts` is imported and the example query is run inside the `load()` function:

```html
<script lang="ts" context="module">
  import * as db from '$lib/db'

  export async function load() {
    const products = await db.products.all()

    return {
      props: { products }
    }
  }
</script>

<script lang="ts">
  export let products
</script>
```

## Adding authentication

Installed [`supabase-ui-svelte`](https://github.com/joshnuss/supabase-ui-svelte):

```bash
npm i -D supabase-ui-svelte
```

Added a sign-in page:

```html
<!-- src/routes/sign-in.svelte -->
<script lang="ts">
  import Auth from 'supabase-ui-svelte'
  import { supabase } from '$lib/db'
</script>

<div class="container">
  <h1>Sign in</h1>

  <Auth supabaseClient={supabase}/>
</div>
```

Then, added a Svelte store to wrap the user data. This way when a user signs in/out all subscribers are notified:

```javascript
// in db.ts
// ...
import { readable } from 'svelte/store'

// ...

export const user = readable(supabase.auth.user(), set => {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event == 'SIGNED_OUT') {
      set(null)
    }
  })
})
```

Then we can use the `user` store in the index page:

```html
<!-- in src/routes/index.svelte -->
<script>
  import { user, auth } from '$lib/db'
</script>

{#if $user}
  <p>You are signed in as {$user.email}</p>
  <button on:click={() => auth.signOut()}>Sign out</button>
{:else}
  <nav>
    <a href="/sign-in">Sign in</a>
  </nav>
{/if}
```

NOTE: had some trouble running on gitpod, so I will have to retry this experiment again later.

## GitPod Snapshot

http://gitpod.io/#https://github.com/joshnuss/supabase-sveltekit-example

## Demo

<video src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1618915722/1000experiments.dev/supbase-gitpod_zcglga.mp4" controls/>

## Notes

- Should it run supabase locally? That would eliminate the need to setup .env
