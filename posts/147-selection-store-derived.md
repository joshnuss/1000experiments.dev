---
title: "Code animation: Derived selection store"
experiment: 147
date: "2021-04-20"
permalink: selection-store-derived
tags: svelte, code-video
---

A few days ago, I built a [selection store](/posts/selection-store) that allows for a global selection.

To style things differently based on whats selected, it requires checking the selection store:

```html
<div class:selected={$selection && $selection.type == 'name-of-type' && $selection.id == 'some-id'}>
  ...
</div>
```

## Derived store

In this experiment, I tried a different approach for detected selection using a `derived()` store. The derived store is a `boolean` that re-computes based on what's selected. It simplifies the usage a bit:

```html
<script>
  import { isSelected } from './selection'

  export let id

  const selected = isSelected('some-type', id)
</script>

<div class:selected={$selected}>
  ...
</div>
```

## Implementation

The derived store implementation looks like this:

```javascript
export function isSelected(type, id = null) {
  return derived(selection, $selection => {
    return $selection && $selection.type == type && $selection.value == id
  })
}
```

## Code

https://svelte.dev/repl/c330df204375413892cfe7f8fa3142f2?version=3.37.0

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1618931734/1000experiments.dev/selection-store-with-derived_ovaz0z.mp4"/>

## Notes

-
