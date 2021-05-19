---
title: Animation commands
experiment: 56
date: "2021-03-18"
permalink: animation-commands
tags: code-video, svelte, animation
---

I'm redoing an [experiment from last week](/posts/code-editor-commands) that got lost because it wasn't saved.

It's funny how redoing things makes it so much better. It's almost a good thing that I lost the work.

## Animation logic

This is about figuring out how the animation code should be organized. The idea is that each command (`append`, `insert`, `scroll`, etc...) is a function that return a object with 3 keys `start`, `stop` and `tween`, each respresents a phase in animation:

```javascript
function insert(editor, step) {
  return {
    start() {
      // stuff to do at the beginning of the step.
      // called once per step
    },
    stop() {
      // stuff to do at the end of the step.
      // called once per step.
    },
    tween(percentage) {
      // this is called repeatedly to tween the animation
      // the parameter is a value between 0 -> 1.0

      // NOTE: the parameter is not always linear,
      // it can move backwards depending on the easing function
    }
  }
}
```

Each phase (`start`, `stop`, `tween`) is optional. In fact the `delay` command implements none of them:

```javascript
function delay() {
  return {}
}
```

## Running a step

Each step executes in a infinite loop of `setTimeout` calls:

```javascript
// import all easingFns as a dictionary
import * as easingFns from 'svelte/easing'

// create a tweened store, it's re-used for each step
const tween = tweened(0)

function next(index) {
  // get the current step
  const step = steps[index]
  // find the command based on step type, and initialize
  const command = command[step.type](editor, step)

  // invoke start logic (when applicable)
  if (command.start) command.start()

  if (command.tween) {
    // reset the tweened store
    tween.set(0, {duration: 0})

    // find the easing function
    const easing = easingFns[step.easing || 'linear']

    // subscribe to change
    tween.subscribe(val => command.tween(val))

    // trigger tweening
    tween.set(1, {duration, easing})
  }

  setTimeout(() => {
    // invoke stop logic (when applicable)
    if (command.stop) command.stop()

    // advance forward
    next(index + 1)
  }, duration)
}
```

## Code

https://svelte.dev/repl/92d2b90946ca4333af4d00a8d7cb4e0a?version=3.35.0
