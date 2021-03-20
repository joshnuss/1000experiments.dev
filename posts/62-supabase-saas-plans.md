---
title: SaaS template: Plans and Authentication
experiment: 62
date: "2021-03-20"
permalink: supabase-saas-plans
tags: supabase, saas
---

Did some more work on creating a saas template for supabase. I'm using svelte-kit, which is quite new, so there's lots to figure out.

I made the hairbrained mistake of swapping the parameters to supabase's `createClient()`, and then had to do a bunch of debugging before figuring out what I did. Oh well.. at least I learned more about debugging vite and svelte-kit.

It's looking really nice though, I copied the plan section from the sales page for the Refactoring UI book. Pretty shmick.

And it's really nice to have supabase working on the server side and the client side. For example, the pricing page can render either SSR or CSR.

Server-side access to supabase will come in handy when we need to talk to external services like Stripe. So stay tuned.

## Demo

<img alt="screenshot" src="https://res.cloudinary.com/dzwnkx0mk/image/upload/v1616228690/1000experiments.dev/Screenshot_from_2021-03-20_04-23-48_pefmil.png"/>
