---
title: Code editor variable durations
experiment: 17
date: "2021-03-04"
permalink: code-editor-variable-duration
tags: code-video, svelte, animation
---

Started working on some refactorings to add more animation capability.
Essential, I would like to be able to tween everything, including typewriter effect speed.

The steps are happeing sequentially, and each step had the same duration.
So I refactored the code to allow each step to have it's own duration.

Also added the ability for a step to define a pause. Without it, each step bleads into the next and it can be difficult to follow when something finished and when it started.

Here's the code:

https://github.com/joshnuss/svelte-codemirror-test/commit/4fcaa2b84c9acd99e02199241bf201719b48337f
