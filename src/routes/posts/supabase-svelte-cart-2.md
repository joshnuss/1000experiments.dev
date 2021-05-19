---
title: "Supacart: adding a cart"
experiment: 108
date: "2021-04-07"
permalink: supabase-svelte-cart-2
tags: e-commerce, supabase, svelte
---

Let's look at adding a local cart to [supacart](/posts/supabase-svelte-cart) project. Since it running locally, I'm using a similar approach to what I tried in the [headless cart experiment](/posts/headless-add-to-cart).

## Cart store

The cart store will persist to `localStorage`. So I'm going to use my trusty `svelte-local-storage-store` package:

```bash
yarn add -D svelte-local-storage-store
```

The cart component is a store that looks like this:

```js
import { derived } from 'svelte/store'
import { writable } from 'svelte-local-storage-store'

// cart is a store with the format `{sku: quantity}`
export const cart = writable('cart', {})

// the total number of items in the cart is derived
// by summing all the quantities in the cart store
export const count = derived(cart, $cart => {
  return Object
    .keys($cart)
    .reduce((acc, sku) => acc + $cart[sku], 0)
})

// adds an items to the cart
export function add(sku) {
  cart.update($cart => {
    // check if the item already exsits
    if ($cart[sku]) {
      // it exists, so increment quantity
      $cart[sku]++
    } else {
      // it doesn't exists, so define a new record
      $cart[sku] = 1
    }

    return $cart
  })
}

// removes an item from the cart
export function remove(sku) {
  cart.update($cart => {
    // delete the sku
    delete $cart[sku]

    return $cart
  })
}

// clears the cart
export function clear() {
  // set cart to an empty dictionary
  cart.set({})
}
```

## Adding to the cart

Dead simple to do with just a `<button>` and an `on:click` handler:

```html
<button on:click={() => add(product.sku)}>Add to cart</button>
```

## Cart icon

In the upper right corner, the site displays a cart icon with the count of items:

```html
<!-- src/routes/$layout.svelte -->
<header>
  <CartIcon/>
</header>
```

And the `<CartIcon>` component is defined as:

```html
<!-- src/lib/components/CartItem.svelte --->
<script>
  // get the count store
  import {count} from '$lib/cart'
</script>

<!-- link to /cart page -->
<a class:empty={$count == 0} href="/cart">
  <span class="count">{$count}</span>
  <svg xmlns="http://www.w3.org/2000/svg" height=30 fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
</a>
```

## Cart page

The cart page displays a list of items in the cart:

```html
<!-- src/routes/cart.svelte -->
<script>
  import { cart, count, remove, clear } from '$lib/cart'
</script>

<h1>Cart</h1>

{#if $count == 0}
  <p>There are no items in your cart</p>
  <a href="/">Start shopping</a>
{:else}
  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th>Quantity</th>
      </tr>
    </thead>
    <tbody>
      {#each Object.entries($cart) as [sku, quantity]}
        <tr>
          <td>{sku}</td>
          <td>{quantity}</td>
          <td><button on:click={() => remove(sku)}>x</button></td>
        </tr>
      {/each}
    </tbody>
  </table>

  <button on:click={clear}>clear</button>
{/if}
```
