---
title: "Code animation: Better snapping"
experiment: 181
date: "2021-05-10"
permalink: better-snapping
tags: svelte, code-video
---

In a [previous experiment](/posts/move-multiple), I added the ability to move events based on a grid, aka "snapping".

But there were some bugs, so I revisted it again.

It turned the bugs were caused by calculating the snap value too early.

```javascript
// calculating snap early
const delta = snap(last - event.pageX)
step.width = initial.width + delta

// calculating snap later
const delta = last - event.pageX
step.width = snap(initial.width + delta)
```

That fixed most of it.

## Code

https://svelte.dev/repl/ced3d88a476b42ceac85c79999c47ad4?version=3.37.0

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1620704250/1000experiments.dev/better-snapping_ipq7xc.mp4"/>

## Notes

- What about multiple selections? maybe overkill for now.
