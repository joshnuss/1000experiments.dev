---
title: "Code animation: Timeline with keyboard & mouse events"
experiment: 167
date: "2021-05-01"
permalink: timeline-keyboard-mouse-events
tags: svelte, code-video
---

This is integration of the following experiments:

- [#124 Context menu](/posts/context-menu)
- [#162 Copy & paste](/posts/copy-paste)
- [#163 Insert, cut, & delete](/insert-cut-delete)

## Code

https://svelte.dev/repl/430d56488ba54aa5b30a32fdbf2f881b?version=3.37.0

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1619880080/1000experiments.dev/timeline-keyboard-mouse-events_bvclyn.mp4"/>

## Notes

- Need placement engine for context menu. Can't assume there is enough place for it below mouse position.
- Should not be able to insert an overlapping item. The item should be sized to fit, or denied if the insertion point is directly over of an element.
