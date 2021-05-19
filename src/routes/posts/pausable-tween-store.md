---
title: Pausable tweened store
experiment: 35
date: "2021-03-10"
permalink: pausable-tween-store
tags: svelte, animation
---

Earlier today, I did an experiment where I needed to [pause a tweened store](/posts/nested-tweens-with-pausing).

Figured it could be turned into a reusable store, so I explored how it might work [in a REPL](https://svelte.dev/repl/abce342ed248428ab6d67d4ee64033b9?version=3.35.0).

Using the standard `tweened()` store, I was able to attach some extra functions, like `.pause()`, `.continue()` etc. It's very similar to how I created my [local storage store](https://github.com/joshnuss/svelte-local-storage-store).

```javascript
// works just like svelte's `tweened` store
const tween = pausableTweened(initial, {duration, easing})

// set works the same too
tween.set(newValue) 

// pause the tween
tween.pause()

// continue from the last pause
// it recomputes time remaining
tween.continue()

// reset back to original value
tween.reset()

// replay from the beginning
tween.replay()
```

Note: one caveat is after a pause, it doesn't honor the last position of easing function. I'll have to look into why.

## Here's the code:

https://svelte.dev/repl/abce342ed248428ab6d67d4ee64033b9?version=3.35.0

## Here's what it looks like:

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1615424308/1000experiments.dev/pausable-tween_n62tri.mp4"/>
