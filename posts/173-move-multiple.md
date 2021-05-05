---
title: "Code animation: Move multiple events"
experiment: 173
date: "2021-05-05"
permalink: move-multiple
tags: code-video, svelte
---

Continuing from the previous post where I adding a feature the timeline to [expand multiple events at once](/posts/drag-all).

In this one, I looked at doing something similar for moving.

By default, only one event is moved, but when the `Control` key is pressed, everything preceeding or following is moved too, depending on the direction of the movement.

## Code

https://svelte.dev/repl/2512beecf699484b87ef70c50e625d84?version=3.37.0

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1620193390/1000experiments.dev/move-mutliple-events_s1robk.mp4"/>

## Notes

- Doesn't work correctly with snapping
