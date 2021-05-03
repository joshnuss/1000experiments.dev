---
title: "Code animation: Variable speed"
experiment: 168
date: "2021-05-02"
permalink: animation-speed
tags: svelte, code-video
---

I'd like to release a svelte store that is based on svelte's `tweened()` stores but with some extra methods.

I experimented with some additional methods in [#35](/posts/pausable-tween-store), [#37](/posts/reverse-tween) and [#48](/posts/restoring-easing-function), but one thing is missing was variable speed adjustment.

This experiment looks at how to adjust the tweened store's speed while it's playing. This is needed for the timeline view, to allow the user to watch at different speeds, ie @2X or @4X speed.

## Code

https://svelte.dev/repl/1c38a4b762714589a2896e2caf6d8af8?version=3.38.1

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1620003864/1000experiments.dev/animation-speed_gkv6an.mp4"/>

