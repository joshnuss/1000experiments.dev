---
title: "Supacart: admin"
experiment: 111
date: "2021-04-08"
permalink: supabase-svelte-cart-admin
tags: svelte, supabase, e-commerce
---

Today I started building the admin portion for the "supacart" project.

I decided to go with a monorepo approach with 2 svelte-kit installations, one for the public store and the other for the admin:

```bash
$> tree
- supacart
  - admin
  - store
```

## Authentication

To perform authentication, I used the [supabase-ui-svelte](https://github.com/joshnuss/supabase-ui-svelte) project.

```html
<!-- admin/src/routes/index.svelte -->
<script>
  import { Auth } from 'supabase-ui-svelte'
  import db from '$lib/db'
</script>

<Auth supabaseClient={db.supabase}/>
```

That worked really well.

## Policies

Added policies to protect the products database table. Everything is private with the exception of selecting data:

```sql
create policy "Admins can create products." on products for
    insert with check (auth.role() = 'authenticated');

create policy "Anyone can view the products." on products for
    select using (true);

create policy "Admins can update products." on products for
    update using (auth.role() = 'authenticated');

create policy "Admins can delete products." on products for
    delete using (auth.role() = 'authenticated');
```

## CRUD

The admin is basically a bunch of CRUD screens.

### Index

The index screen shows a list of products and allows the user to remove products or click to view them.

```html
<!-- admin/src/routes/products/index.svelte -->
<script context="module">
  import db from '$lib/db'

  export async function load() {
    const products = await db.products.all()

    return {
      props: { products }
    }
  }
</script>

<script>
  export let products

  async function del(product) {
    if (!confirm("are you sure?")) return

    // delete a product
    await db.products.del(product)

    // remove it from the list
    products = products.filter(p => p.id !== product.id)
  }
</script>

<h1>Products</h1>

<a href="/products/new">Add a product</a>

<table>
  <thead>
    <tr>
      <th>sku</th>
      <th>name</th>
      <th>price</th>
      <th/>
    </tr>
  </thead>

  <tbody>
    {#if products}
    {#each products as product}
      <tr>
        <td>{product.sku}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>
          <a href="/products/{product.permalink}">view</a>
          <button on:click={() => del(product)}>delete</button>
        </td>
      </tr>
    {/each}
    {/if}
  </tbody>
</table>
```

### Shared form

Adding and updating share the same form logic, so I extracted a `Form` component:

```html
<!-- admin/src/routes/products/_Form.svelte -->
<script>
  export let product
  export let action = 'Save'
</script>

<form on:submit|preventDefault>
  <input bind:value={product.name}/>
  <input bind:value={product.permalink}/>
  <input bind:value={product.sku}/>
  <textarea bind:value={product.details}/>
  <input bind:value={product.price}/>
  <button>{action}</button>
</form>
```

### Creating

The Create Page makes use of the `Form` component and redirects to the Edit Page after saving.

```html
<!-- admin/src/routes/products/new.svelte -->
<script>
  import db from '$lib/db'
  import Form from './_Form.svelte'
  import { goto } from '$app/navigation'

  let product = {}

  async function submit() {
    // create the product
    await db.products.create(product)

    // redirect to edit page
    goto(`/products/${product.permalink}`)
  }
</script>

<h1>New product</h1>

<Form bind:product on:submit={submit} action="Create"/>
```

### Updating

Updating is very similar to the Create Page, except it loads the existing record first:

```html
<!-- admin/src/routes/products/[permalink].svelte -->
<script context="module">
  import db from '$lib/db'

  export async function load({page}) {
    // load the product
    const product = await db.products.find(page.params.permalink)

    // return 404 if not found
    if (!product) {
      return {
        status: 404,
        error: new Error('product not found')
      }
    }

    // returns props if found
    return {
      props: { product }
    }
  }
</script>

<script>
  import { goto } from '$app/navigation'
  import Form from './_Form.svelte'

  export let product = {}

  async function submit() {
    // update the product
    await db.products.update(product)

    // redirect to products index page
    goto('/products')
  }
</script>

<h1>Updating: {product.name}</h1>

<Form bind:product on:submit={submit} action="Save"/>
```
