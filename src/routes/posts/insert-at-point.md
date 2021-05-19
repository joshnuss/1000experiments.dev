---
title: "Code animation: Insert at point"
experiment: 138
date: "2021-04-16"
permalink: insert-at-point
tags: svelte, code-video
---

For the timeline portion of the [code animation project](/tag/code-video), the user will want to place an event anywhere on the timeline.

They initiate the process by moving their mouse to a point in the timeline, and right-clicking to [show a context menu](/posts/context-menu) and choosing what type of event they want to add.

## Implementation

The whole thing works by capturing the `mouseover` event to get the current point. When the right-click happens - before showing the context menu - the last point is captured. This is needed because the user will continue to use their mouse to navigate thru the context menu, and we don't want those movements impacting the insertion point.

Once the menu option is chosen, an event is fired called `on:add`, which the parent handles to add an event to the list:

```html
<script>
  let events = []

  function add({detail: {type, point}}) {
    events = [...events, { type, x: point.x }]
  }
</script>

<Timeline {events} on:add={add}/>
```

## Code

https://svelte.dev/repl/ae2c12e5b3294e60b017427b07d6aed0?version=3.37.0

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1618560124/1000experiments.dev/insert-at-point_enmwvd.mp4"/>
