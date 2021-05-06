---
title: "Code animation: Discrete tween"
experiment: 174
date: "2021-05-05"
permalink: discrete-tween
tags: svelte, code-video
---

Svelte's builtin `tweened()` store works on continuous values. ie if the store's value is zero, and it's set to `1`, it may produce values like `0`, `0.1`, `0.5`, `0.6`, `0.7`...`1`.

But sometimes you have values that are discrete. For example, if you want to toggle between several states `['red', 'green', 'blue']`. In this case you want to tween the index of the array, instead of the value.

This experiment builds a new store on top of `tweened()` that can animate between discrete values.

The API looks like this:

```javascript
import { tweened } from './discrete-tweened-store'

const store = tweened({values: ['red', 'green', 'blue'], duration: 1000})

// toggle between each value
// total duration is 1000ms, therefore each state lasts 333ms
store.run()

// we can play it in reverse
store.reverse()

// or reset back to index zero
store.reset()
```

## Code

https://svelte.dev/repl/aba73c2d69884051b43c53b8524e2556?version=3.38.2

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1620265969/1000experiments.dev/discrete-tween_pkw98y.mp4"/>

## Notes

- Maybe an abstraction can be created on top of this, like "an array of tweens", so you can run a set of operations on many tweens at once.
