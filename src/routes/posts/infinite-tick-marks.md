---
title: "Code animation: Infinite tick marks"
experiment: 123
date: "2021-04-12"
permalink: infinite-tick-marks
tags: svelte, code-video
---

Yesterday I did [a mockup of the timeline editor](/posts/code-editor-mockup-first-pass). One thing I found is that timeline view can grow horizontally based on the duration of the timeline. Which means the tick marks at the top of the timeline must grow based on the duration too.

The method I settled on is using an `<svg>` for the tick marks. It has a dynamic `width` based on the `duration`. This way when the `duration` of the video increases, the `width` would increase by the same factor (obeying the `zoom` scale).

## Empty timeline

The only hiccup is when the timeline is empty or less than one screen width. We want the tick to take up at least one screen width.

So I used `bind:clientWidth` to find that value, and `Math.max(...)` to select the bigger value, ie screen width or total duration.

## Code

https://svelte.dev/repl/a3d8099e4d964676bc1c3f6fa51c01c7?version=3.37.0

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1618210449/1000experiments.dev/infinite-tick-marks_icxgra.mp4"/>

## Notes

- When the duration scales up, the number of tick marks should scale down.
 ie. tick mark at every 0.1 second doesn't make sense if your way zoomed out.
