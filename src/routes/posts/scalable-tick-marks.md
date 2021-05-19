---
title: "Code animation: Scalable tick marks"
experiment: 183
date: "2021-05-12"
permalink: scalable-tick-marks
tags: svelte, code-video
---

This is a remix of [#123](/posts/infinite-tick-marks), I looked at [using D3](/posts/d3-variable-tick-spacing), but I rather role my own, so I can control the look better.

## Code

https://svelte.dev/repl/7dbc43457fbb49e296a11cf90f300252?version=3.38.2

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1620794119/1000experiments.dev/scalable-tick-marks_h213k8.mp4"/>

## Notes

- Scales should change, ie when zoomed out, major tick marks are seconds, when zoomed in, major tick marks are tenths of seconds
