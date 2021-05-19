---
title: "Code animation: Staggered animation"
experiment: 171
date: "2021-05-04"
permalink: staggered-animation
tags: svelte, code-video
---

This one looks at triggering a sequence of animations using the `delay:` option.

```javascript
const a = tweened(0, {duration: 1000, delay: 0})
const b = tweened(0, {duration: 1000, delay: 1000})
const c = tweened(0, {duration: 1000, delay: 2000})
```

In the past, I investigated [nested tweens](/posts/nested-tweens-with-pausing), but I think this is a simpler approach, because each animation has its own duration and delay defined, so they can be started and/or stopped all at once.

## Code

https://svelte.dev/repl/c8ebb42a75d140a69dfe2b0d711ecfe3?version=3.38.2

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1620177387/1000experiments.dev/staggered-animation_ndygvj.mp4"/>

## Notes

- If you pause all the animations, and later you want to continue them. You should only continue the ones that after the pause point.
