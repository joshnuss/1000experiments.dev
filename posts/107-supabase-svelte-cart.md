---
title: "Supacart: a cart with supabase + svelte"
experiment: 107
date: "2021-04-07"
permalink: supabase-svelte-cart
tags: e-commerce, supabase, svelte
---

Lot's of interesting tech is dropping. [svelte-kit](https://kit.svelte.dev/) is now in beta, and [supabase launched a bunch of stuff](https://supabase.io/blog/2021/03/25/launch-week).

So it's a good time to investigate what e-commerce looks like with these tools.

## Setup

To setup a `svelte-kit` project

```bash
mkdir supacart && cd supacart
npm init svelte@next
```

Now add [`supabase-js`](https://www.npmjs.com/package/@supabase/supabase-js):

```bash
yarn add -D @supabase/supabase-js
```

## Database

To start, it will just be a list of products:

```sql
drop table if exists products;

create table products (
  id serial primary key,
  permalink varchar not null unique,
  sku varchar not null unique,
  name varchar not null,
  details varchar not null default '',
  price money not null
);

create unique index products$permalink on products (permalink);

insert into products ( permalink, name, sku, price ) values ('t-shirt', 'T-Shirt', 't-shirt', '19.99');
insert into products ( permalink, name, sku, price ) values ('pants', 'Pants', 'pants', '79.99');
```

We'll store env vars in `.env`:

```
VITE_SUPABASE_URL=<supabase-url-here>
VITE_SUPABASE_PUBLIC_KEY=<supabase-public-key-here>
SUPABASE_PRIVATE_KEY=<supabase-private-key-here>
```

Notice the prefix `VITE_`, that makes the variable available in the public bundle that is served to the browser. Since the private key should never be shared, it is not prefixed with `VITE_`.

## Routes

The root route `/` will display a list of products:

```html
<!-- src/routes/index.svelte -->
<script context="module">
  import db from '$lib/db'

  // load products from db
  export async function load() {
    return {
      props: {
        products: await db.products.all()
      }
    }
  }
</script>

<script>
  export let products
</script>

{#each products as product}
  <article>
    <a href="/products/{product.permalink}">{product.name}</a>
  </article>
{/each}
```

And the product page will be at `/products/:permalink`, so let's create a page for that too:

```html
<script context="module">
  import db from '$lib/db'

  export async function load({page}) {
    // find the product
    const product = await db.products.find(page.params.permalink)

    // if we found it, return it as a prop
    if (product) {
      return {
        props: {
          product
        }
      }
    }

    // oh shoot, we didn't find a product, so return 404
    return {
      status: 404,
      error: new Error('product not found')
    }
  }
</script>

<script>
  // this prop will be provided by the `load` function
  export let product
</script>

<h1>{product.name}</h1>
<p>SKU: {product.sku}</p>

<p>{product.details}</p>

{product.price}
```

## Data access

The logic to access the DB is extracted to it's own file `src/lib/db.js`. That will help keep our UI components slim, because they won't have to deal directly with the database.

```js
// src/lib/db.js
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLIC_KEY
)

export default {
  products: {
    async all(options = {}) {
      const { data } = await supabase.from('products').select('*')

      return data
    },

    async find(permalink) {
      const { data } = await supabase
        .from('products')
        .select('*')
        .match({permalink})
        .single()

      return data
    }
  }
}
```

## Summary

That gives us everything we need to display a homepage and a product page. It can render server side and client side too.
