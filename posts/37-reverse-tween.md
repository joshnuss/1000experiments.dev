---
title: Playing a tween in reverse
experiment: 37
date: "2021-03-11"
permalink: reverse-tween
tags: svelte, animation
---

After [adding more functions](/posts/pausable-tween-store) to a `tweened` store. I realized I forgot to add reversing as well.

Reversing will be handy if you want to rewind a series of tweens, which I will need for the [code animation project](/tag/code-video)

To reverse a tween, the tween is paused at its current value, and then tweened back to its initial value:

```javascript
store.reverse = async () => {
  // get current value
  const value = get(store)
  // compute how much was done so
  const percentageCompleted = (value - initial) / (store.lastSet - initial)
  // compute how much time was spent so far
  const completed = options.duration * percentageCompleted

  // pause at current value
  set(value, {duration: 0})
    
  // go back to the initial value
  // duration is the time spent so far
  return set(initial, {duration: completed})
}
```

## Here's the code:

https://svelte.dev/repl/21e75022cc7a4acc95678447141fbee8?version=3.35.0

## Here's what it looks like:

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1615508486/1000experiments.dev/tween-reverse_xfvl8o.mp4"/>
