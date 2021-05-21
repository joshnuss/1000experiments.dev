---
title: Supabase testbed
experiment: 193
date: "2021-05-21"
permalink: supa-mini
tags: supabase, nodejs
---

I'm thinking about trying out some new server-side ideas for supabase.

## Validation

I wonder if it's possible to have nice user-friendly validation messages integrated directly into the server.
Something like:

```bash
> curl -X POST server.tld/table-name --data '{...}'
{
  "errors": {
    "name": ["is required", "must be at least 3 characters"],
    "price": ["must be greater than zero"]
  }
}
```

Often the only reason to use a cloud function or stored procedure is to validate things. But if validation was baked right in, we wouldn't need to reach for those as often.

## Transactions

What if transactions were supported? This would also reduce the need for stored procs.

We could write database transaction code inside cloud functions with higher-level languages like JS, Ruby etc... Not to bash on PLGSQL, but there's no classes, package system, which makes it harder to have abstractions. There's no source control either.

Since transactions are inherintly stateful, raw HTTP 1.x doesn't make sense for that. But WebSockets or HTTP2 might work. That's what I want to explore in a future experiment.

## Building a test bed

[PostgREST](https://github.com/PostgREST/postgrest) is written in Haskell, which I'm not familiar with (yet). Instead I built a small testbed with JavaScript. You can see the code below.

It took about 1 hour to build, so I'm pretty happy with it.

**Disclaimer**: this has nowhere near the features PostgREST has, it's a very naive version to test out some ideas.

## Code

https://github.com/joshnuss/supa-mini

## Notes

- It should support `.not` filters, like `not.eq=1`, `not.is=true` etc...
