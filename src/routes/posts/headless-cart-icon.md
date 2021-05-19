---
title: Headless cart icon
experiment: 106
date: "2021-04-06"
permalink: headless-cart-icon
tags: e-commerce, headless
---

After building a headless [buy button](/posts/headless-buy-button) and [add to cart button](/posts/headless-add-to-cart), the next stop is a cart icon.

The cart icon displays the total number of items in the cart, and acts as a button the user can click to view their cart and initiate the checkout.

Using the cart icon component would look like this:

```html
<header>
  <cart-icon>
    <!-- svg icon here (optional) -->
  </cart-icon>
</header>
```

## Code

Implenting the `<cart-icon>` component is fairly straight-forward, since we're already exporting a derived store called `count`:

```html
<svelte:options tag="cart-icon"/>

<script>
  // import the derived store
  import {count} from './cart'

  function click() {
    // open cart view
  }
</script>

<button class:empty={$count == 0} on:click={click}>
  <span class="count">{$count}</span>
  <svg xmlns="http://www.w3.org/2000/svg" height=30 fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
</button>
```

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1617683603/1000experiments.dev/headless-cart-icon_t9wls2.mp4"/>
