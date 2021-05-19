---
title: "Supacart: search"
experiment: 109
date: "2021-04-07"
permalink: supabase-svelte-cart-search
tags: supabase, svelte, e-commerce
---

Most e-commerce sites need search functionality. Thankfully, supbabase supports full text search via the `.textSearch()` function.

## Search box

So I added a search box to the header:

```html
<header>
  <Logo/>
  <SearchBox/>
  <CartIcon/>
</header>
```

The `<SearchBox>` component will need to make use of auto complete, so i decided to use [`simple-svelte-autocomplete`](https://github.com/pstanoev/simple-svelte-autocomplete)

```bash
yarn add -D simple-svelte-autocomplete
```

Then the search component looks like this:

```javascript
<script>
  import db from '$lib/db'
  import AutoComplete from "simple-svelte-autocomplete"

  // called everytime the input changes
  async function search(search) {
    return await db.products.all({search, limit: 5})
  }

  // when a selection is made, go directly to the product
  function select(product) {
    if (!product) return

    // navigate to product page
    window.location.href = `/products/${product.permalink}`
  }
</script>

<AutoComplete
  inputId="search"
  searchFunction={search}
  labelFieldName="name"
  onChange={select}
  minCharactersToSearch=2
  placeholder="search"
  showClear={true}
  hideArrow={true}
  noResultsText="No products found"
/>
```
