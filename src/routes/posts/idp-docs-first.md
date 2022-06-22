---
title: "IdP: Docs first"
experiment: 231
date: "2022-06-21"
permalink: idp-docs-first
tags: idp, auth, docs
---

For developer tools, the best marketing is the docs.

Just show them how it's easier, how it saves them time.

- Stripe did this with their [original site](http://web.archive.org/web/20111007130738/https://stripe.com/) highlighting a `curl` command (and they continue to invest in docs).
- DHH did this with his [15 minute blog demo](https://www.youtube.com/watch?v=Gzj723LkRJY).

## Working backwards

Docs-driven development is a way to ensure the target is clear and coherant before beginning implementation.

It's describing the desired end-result, and working backwards. Just like Amazon does by [writing PR statements before creating a product](https://www.productplan.com/glossary/working-backward-amazon-method/).


## Bye bye landing page

So I decided instead of investing time into a landing page, I'll put my energy into a docs site first.

It will take some time to fill it out, but this is the plan so far:

## TOC

```
src/routes/
├── api.md
├── billing.md
├── cli.md
├── configuration.md
├── index.md
├── strategies
│   ├── index.md
│   ├── oauth.md
│   ├── passwordless.md
│   ├── passwords.md
│   └── sso.md
└── webhooks.md
```

I will try to open-source it as early as possible.
