---
title: Command store with live updating
experiment: 131
date: "2021-04-15"
permalink: command-store-with-live-updating
tags: svelte, code-video
---

The [command store](/posts/command-store) that I built yesterday is great for creating a log of operations. But what if you want to show changes in realtime. If a value is databound to a field, that could mean updating on every key press.

It would be easier to have 2 stores:

1. A "live" store that can be mutated directly, ie. with data binding.
2. A command store where changes are applied once committed.

## Implementation

We define 2 stores, effectively duplicating the data:

```html
let store = writable(initialstate)
let commandstore = commandstore(initialstate, commands)
```

And then our inputs bind directly to the "live" store:

```html
<input type="color" bind:value={$store.settings.background} on:blur={save}/>
```

The `save()` function is only called after we leave the field, that avoid creating a command on each key press:

```javascript
function save() {
  commandStore.execute('updateSettings', {
    background: $store.settings.background
  })
}
```

## Code

https://svelte.dev/repl/e780caa61d4248288e76ab76cc04ca95?version=3.37.0

## Demo

<video src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1618467945/1000experiments.dev/command-store-with-realtime-update_i7kyyx.mp4" controls/>

## Notes

- What happens if `on:blur` hasn't fired yet, and the user closes the tab. Currenty, that change in lost.
