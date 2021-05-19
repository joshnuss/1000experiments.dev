---
title: "Code animation: Selection integration"
experiment: 148
date: "2021-04-21"
permalink: selection-integration
tags: svelte, code-video
---

After exploring how to maintain global [selection with a store](/posts/selection-store), it's ready to be integrated in the app.

There are 4 parts to this:

1. Toggling the selection from multiple places in the app.
2. Adjusting the style of objects once they're selected.
3. Making the property editor component conditional based on the selection.
4. Clearing all selections when the user clicks on the background.

## Toggling selection

The selection is initiatied by clicking on element:

```html
<script>
  import { toggle } from '$lib/selection'
</script>

<div on:click={() => toggle('selection-type', id)}>
  ...
</div>
```

## Styling the selection

Components can watch for [selection changes using the derived store](/posts/selection-store-derived) and adjust css classes.

```html
<script>
  import { watchSelection } from '$lib/selection'

  // returns a `derived` store
  const selected = watchSelection('selection-type', id)
</script>

<div class:selected={$selected}>
  ...
</div>

<style>
  .selected {
    ...
  }
</style>
```

## Conditional property editor

The component displayed in the property editor sidebar is based on the selection:

```html
<script>
  import { selection } from '$lib/selection'
</script>

{#if $selection.type == 'settings'}
  <SettingsEditor/>
{:else if $selection.type == 'frame'}
  <FrameEditor/>
{:else if $selection.type == 'window'}
  <WindowEditor/>
{:else if $selection.type == 'event'}
  <EventEditor id={$selection.id}/>
{/if}
```

## Clearing all selections

All selections can be cleared by clicking the background:

```html
<script>
  import { clear } from '$lib/selection'
</script>

<main on:click={clear}>
  ...
</main>
```

## Snapshot

https://gitpod.io#snapshot/ce7574bb-112f-4d72-881d-a1d12da6d9d0

## Demo

<video src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1619068908/1000experiments.dev/selection-integration_h0rla6.mp4" controls/>

## Notes

- Should selection support `on:focus` events? That would allow focusing with just keyboard tab key. Probably overkill though.
- Instead of using `{#if $selection.type}` to display components conditionally, an alternative is to use a dictionary, ie `<svelte:component this={dictionary[type]}/>`
