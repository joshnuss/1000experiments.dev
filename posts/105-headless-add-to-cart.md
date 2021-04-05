---
title: Headless add to cart button
experiment: 105
date: "2021-04-05"
permalink: headless-add-to-cart
tags: e-commerce
---

In the previous experiment, I created a [`<buy-button>` web component](/posts/headless-buy-button). In this experiment, I add an "add to cart" button as well.

## API

The API will be similar to the `<buy-button>`:

```html
<!-- import js -->
<script src="https://domain.tld/cart.js"></script>

<!-- define a button -->
<add-button sku="t-shirt">Add to Cart</add-button>
```

## Cart Storage

A cart can be stored server side or client side. This example will use the client side approach and persis the data in the browser's `localStorage`.

In fact, I built a Svelte store for `localStorage` called [`svelte-local-storage-store`](https://npmjs.com/package/svelte-local-storage-store), which will work perfectly here.

The idea is to have a dictionary with `sku` as the key and `quantity` as the value, ie  `{sku: quantity, ...}`. We'll also define accessor functions, like `add()`, `clear()` etc.. And to count the total quantity in the cart, we can use a `derived` store.

```javascript
import { derived } from 'svelte/store'
import { writable } from 'svelte-local-storage-store'

// a store backed by local storage
export const cart = writable('cart', {})

// the count of items in the cart is derived from the cart store
export const count = derived(cart, $cart => {
  // use Array.reduce() to sum the quantity.
  return Object
    .keys($cart)
    .reduce((acc, key) => acc + $cart[key], 0)
})

// add an item to the cart
export function add(sku) {
  // update the store
  cart.update($cart => {
    // check if the item already exists in the cart
    if ($cart[sku]) {
      // there's already one in the cart, so increment quantity
      $cart[sku]++
    } else {
      // it doesn't exist, so add it to the store with a quantity of 1
      $cart[sku] = 1
    }

    return $cart
  })
}

// clear the cart by setting it to an empty dictionary
export function clear() {
  cart.set({})
}
```

## Button definition

The `<add-button>` is very similar the `<buy-button>` except it uses the cart:

```html
<svelte:options tag="add-button"/>

<script>
  import {cart, add} from './cart'

  export let sku

  if (!sku) console.error('<add-button> sku must be set')

  function submit() {
    add(sku)
  }
</script>

<form on:submit|preventDefault={submit}>
  <button part="button">
    <slot/>
  </button>
</form>
```
