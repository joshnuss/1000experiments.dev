---
title: Timeline manual position selection
experiment: 31
date: "2021-03-09"
permalink: timeline-selection
tags: code-video, animation, svelte
---

Continuing with yesterday's [timeline editor experiment](/posts/timeline-editor), I looked into how to allow the user to re-position the timeline's cursor manually.

The whole timeline is controlled by a linear tween `$pos`. By capturing click events, we can determine the `x` position with `event.clientX` and translate that back to `$pos`. But we can't adjust `$pos` directly, ie `$pos = newPos`, because that will cause the store to tween from the current value to `newPos`.

The trick is tell the store to not tween this change. We can do that by seting the `duration` parameter to zero when setting the tween. `pos.set(newValue, {duration: 0})`.

## Here's the code:

https://svelte.dev/repl/e72036dc8ae645e986a8eb935565a4ff?version=3.35.0

## Here's what it looks like:

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1615317972/1000experiments.dev/timeline-selection_vpi5uv.mp4"/>
