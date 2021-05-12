---
title: "Code animation: Tick marks with keyboard zooming"
experiment: 182
date: "2021-05-11"
permalink: keyboard-zooming-with-infinite-tick-marks
tags: svelte, code-video, integration
---

This is an integration of:

- [#121 Horizontal zooming](/posts/horizontal-zooming)
- [#123 Infnite tick marks](/posts/infinite-tick-marks)

## Code

https://svelte.dev/repl/5c8cb076440c4ff9accfec6a8b422e9f?version=3.37.0

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1620789488/1000experiments.dev/inifinite-tick-marks-with-keybd-zooming_coeyz9.mp4"/>

## Notes

- Tick marks should scale based on zoom level, would improve performance too, because far less marks need to be rendered. Maybe it could even use a virtual list?
