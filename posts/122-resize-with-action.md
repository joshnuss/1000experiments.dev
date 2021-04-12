---
title: Resize with Svelte Action
experiment: 122
date: "2021-04-12"
permalink: resize-with-action
tags: svelte, code-video
---

One component I need for the [code animation project](/tag/code-video) is a way to resize elements.

In this experiment, I look at building a generic component using a Svelte Active.

Example usage:

```html
<div use:resize/>
```

It handles resizing in 8-directions: north, south, east, west, north-west, north-east, south-west, and south-east.

## Code

https://svelte.dev/repl/8b974ea483c648fba362a1e9f3dbc29f?version=3.37.0

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1618207361/1000experiments.dev/8-direction-resize_llkqkv.mp4"/>

## Notes

- Support resizing in fixed increments, by holding down `shift` key while dragging
- Alternative to building this an action is using a component with a slot
