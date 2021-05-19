---
title: "Code animation: Selection store"
experiment: 137
date: "2021-04-16"
permalink: selection-store
tags: code-video, svelte
---

To make the [property editor](/posts/editor-ui-with-property-editor) work, the UI must show a different editor depending on the current selection.

The selection can either:

- The frame
- The code editor
- A single event on the timeline
- The settings

But there is only one selection at a time. That means a global store is a good place to keep this data:

## Selection Store API

- `select(type, id)`: selects a specific `type` of item, `id` is optional.
- `clear()`: wipes out the current selection.
- `toggle(type, id)`: similar to `select()`, except it clears the selection if it has the same `type` and `id`.

## Code

https://svelte.dev/repl/bb2875325ee34c94afaf12b7084f94fc?version=3.37.0

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1618553479/1000experiments.dev/selection-store_jmcx6r.mp4"/>

## Notes

- A common task is matching against current selection to add a css class. I wonder if that can be simplified further with a `derived` store.
