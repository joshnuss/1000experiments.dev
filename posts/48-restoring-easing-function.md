---
title: Restoring an easing function
experiment: 48
date: "2021-03-15"
permalink: restoring-easing-function
tags: animation, svelte
---

Last week I created a [pausible tweened store](/posts/pausable-tween-store), but it didn't work right with easing functions.

I did some investigating, and the problem was that when un-pausing a tween, the easing function starts over again from the beginning. For example: say you have a tween setup for a duration 4 seconds, if we pause at 2.5 seconds, and then continue on, we have 1.5 seconds remaining. But we don't want the easing to start from scratch (time=0), we want the easing to continue on from the last paused time (2.5s).

The challenge is that svelte's `tweened` store doesn't share how much time was elapsed. I could re-write the entire `tweened` store from scratch to capture the time elapsed, but I used a hack instead. Since the `easing(t)` function receives the elapsed time as parameter `t`, I can wrap the easing function and capture the elapsed time:

```javascript
// store time elapsed
let elapsed

// wrap the easing function
const wrappedEasingFn = t => {
  // capture the time elapsed
  elapsed = t

  // call actual easing function
  return elasticInOut(t)
}

// use the wrapped function when defininf the store
const store = tweened(0, {duration: 0, easing: wrappedEasingFn})
```

Then to restore the easing:

```javascript
// compute amount remaining using the globally stored `elapsed` var,
// it's a value between 0 to 1.0
const remaining = 1-elapsed
// compute remaining time
const remainingMs = remaining*duration
// create a patched version of the easing function
// that skews the parameter t to take into account time elapsed before the pause
const skewedEasing = t => easing(elapsed + (t*remaining))

// trigger the continuation of the tween
store.set(max, {duration: remainingMs, easing: skewedEasing})
```

## Code

https://svelte.dev/repl/675a44d7781e4bb4bf00f13caae261c5?version=3.35.0
