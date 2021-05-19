---
title: "Code animation: Derived tween"
experiment: 179
date: "2021-05-09"
permalink: derived-tween
tags: svelte, code-video
---

What happens when there is a set of animation that need to act in concert?

One approach is create a new type of `derived` store that can pause, continue, reset, etc..

This is based off the [animation store experiment](/posts/svelte-animation-store).

The idea would work like this:

```javascript
const storeA = animation(...)
const storeB = animation(...)
const derived = derivedAnimation([storeA, storeB])

derived.pause()
```

## Code

https://svelte.dev/repl/62b6423572634f48848d559c462750d5?version=3.38.2

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1620546030/1000experiments.dev/derived-tween-store_his1q7.mp4"/>

## Notes

- The problem with this approach is you still need to trigger each underlying animation on it's own with `.set()` or `.update()`. Maybe animation stores shouldn't allow arbitrary value settings.
