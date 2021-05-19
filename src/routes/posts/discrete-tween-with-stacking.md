---
title: "Code animation: Discrete tween with stacking"
experiment: 178
date: "2021-05-09"
permalink: discrete-tween-with-stacking
tags: svelte, code-video
---

After building a [discrete tween store](/posts/discrete-tween), it occurred to me that the most common use cases are:

1. The store returns a single value that changes over time based on `duration` and `delay`
2. The store maintains a stack of all previous states. It's like having animated state mutation.
3. The store value is a set, each step in the animation can have a `key:`, and only the latest value for a key is maintained.

## Code

https://svelte.dev/repl/d3ef8bddaca84c0d995282fa526cd264?version=3.38.2

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1620546030/1000experiments.dev/discrete-tween-with-stacking-and-unique_vewltv.mp4"/>
