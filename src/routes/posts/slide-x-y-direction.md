---
title: Sliding SVG in both x and y direction
experiment: 5
date: "2021-02-28"
permalink: slide-x-y-direction
tags: animation, svelte
---

Expanding on yesterday's [experiment #3](/posts/animated-timeline). I wanted the timeline to move downward in Y direction, not just X direction.
It's basically tweening the `viewBox` attribute using Svelte's `tweened` store.

Here's the code:

https://gist.github.com/joshnuss/6ab13173bea956ac65a628c639eae026

Here's what it looks like

![animation](/images/slides-with-x-y-movement.gif)
