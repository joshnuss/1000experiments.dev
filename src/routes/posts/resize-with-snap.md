---
title: "Code animation: Resize with snap"
experiment: 160
date: "2021-04-28"
permalink: resize-with-snap
tags: svelte, code-video
---

In [experiment #119](/posts/drag-to-resize), I worked out resizing elements. The resize happens at a single pixel resolution. But often you want to resize based on a grid.

It turns out, all it takes is rounding to the nearest grid position:

```javascript
const gridSize = 10

function snapToGrid(width) }
  return Math.round(width / gridSize) * gridSize
}
```

## Code

https://svelte.dev/repl/c7ae142262d9430889e4c4e2a46e707c?version=3.37.0

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1619585052/1000experiments.dev/resize-with-snap_ai52vr.mp4"/>
