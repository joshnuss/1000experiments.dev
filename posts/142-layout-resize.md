---
title: "Code animation: Layout resize"
experiment: 142
date: "2021-04-18"
permalink: layout-resize
tags: svelte, code-video
---

The editor that I'm building for the [code animation project](/tag/code-video) contains multiple panes. There's a footer that displays the timeline of events and a property editor sidebar. Both of these panes should be resizable.

## Technique

The technique for resizing is the same for both vertical and horizontal resizing. The only difference is that vertical resize binds against `width` and uses `cursor: col-resize`, and the horizontal resize uses `height` and `cursor: row-resize`.

## Vertical splitter

It assumes that the initial value of `width` is hardcoded.

```html
<script>
  export let height = 0
  export let width
  export let min = 0

  let moving = false
  let startWidth
  let startX

  // start the dragging
  function start(event) {
    startX = event.pageX
    startWidth = width
    moving = true
  }

  // perform resize
  function move(event) {
    if (!moving) return

    event.preventDefault()

    const delta = startX - event.pageX
    width = Math.max(min, startWidth + delta)
  }

  // stop the dragging
  function stop() {
    moving = false
  }
</script>

<svelte:window on:mouseup={stop} on:mousemove={move}/>

<div class="v-splitter" style="height: {height}px" on:mousedown={start}>

</div>

<style>
  .v-splitter {
    position: absolute;
    cursor: col-resize;
    width: 10px;
    margin-left: -5px;
    background: blue;
    opacity: 0.2;
  }
</style>
```

## Horizontal splitter

It assumes that the initial value of `height` is hardcoded.
Nearly identical to the vertical splitter, just with `height`/`width` and `x`/`y` swapped.

```html
<script>
  export let width = 0
  export let height
  export let min = 0

  let moving = false
  let startHeight
  let startY

  // start dragging
  function start(event) {
    startY = event.pageY
    startHeight = height
    moving = true
  }

  // perform resize
  function move(event) {
    if (!moving) return

    event.preventDefault()

    const delta = startY - event.pageY
    height = Math.max(min, startHeight + delta)
  }

  // stop dragging
  function stop() {
    moving = false
  }
</script>

<svelte:window on:mouseup={stop} on:mousemove={move}/>

<div class="h-splitter" style="width: {width}px" on:mousedown={start}>
</div>

<style>
  .h-splitter {
    position: absolute;
    cursor: row-resize;
    height: 10px;
    margin-top: -5px;
    background: red;
    opacity: 0.2;
  }
</style>
```

## Persistance

These settings can be persisted to local storage using the [`local-storage-store`](https://www.npmjs.com/package/svelte-local-storage-store).

## Code

https://svelte.dev/repl/2522dd572cf946e2b988d98975001801?version=3.37.0

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1618739826/1000experiments.dev/layout-resize_macasj.mp4"/>

## Notes

-
