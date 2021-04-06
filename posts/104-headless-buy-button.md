---
title: Headless buy button
experiment: 104
date: "2021-04-05"
permalink: headless-buy-button
tags: e-commerce, headless
---

The trend in e-commerce is moving towards headless. Folks want to use modern stacks like Svelte & Vue instead of relying on the clunkier and dated options provided by site builders.

One approach that could work well is [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components).

It's nice because it would work for everything from a static `.html` file, all the way up to server rendered content. It doesn't have any requirement to use React, Vue or Svelte.

## Example

An example "Buy Now" button would work like this:

```html
<!-- import js -->
<script src="https://domain.tld/cart.js"></script>

<!-- define a button -->
<buy-button sku="t-shirt">Buy Now</buy-button>
```

It can be that simple.

## Code

Under the hood it's using Svelte's `<svelte:options>` directive which does the heavy lifting of create a `customElement`.

```html
<svelte:options tag="buy-button"/>

<script>
  export let sku

  if (!sku) console.error('<buy-button> sku must be set')

  function submit() {
    // create checkout and redirect
  }
</script>

<form on:submit|preventDefault={submit}>
  <button part="button">
    <slot/>
  </button>
</form>
```
