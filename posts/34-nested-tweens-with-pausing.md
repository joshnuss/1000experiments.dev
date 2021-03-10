---
title: Nested tweens with pausing
experiment: 34
date: "2021-03-10"
permalink: nested-tweens-with-pausing
tags: svelte, animation
---

In this experiment, I looked at how to nest tweens and still be able to pause and restart them.

**Background**: to have a user-friendly timeline for the [code animation project](/tag/code-video), the position of the timeline [can be adjusted manually](/posts/timeline-selection) or paused and restarted at any time.

Pausing is done by setting the tween to it's current value, with no transition (ie `duration` of zero):

```javascript
// get current value of tween
const currentValue = get(tween)

// the trick is to set duration = 0
// which causes the tween to stop immediately with no interpolation
tween.set(currentValue, {duration: 0})
```

Keep in mind, each step in the timeline has it's own tween, with it's own duration and easing function. Those are paused as well.

Later, to continue playing on from the current step, we need to figure out the time remaining both on the current step and on the total timeline.

The rough idea:

```javascript
const stepDuration = 1000

// each step in the timeline has it's own tween
const timeline = [
  {
    label: "Step #1",
    // the step's tween
    tween: tweened(0, {duration: stepDuration, easing: ...})
  },
  // ... more steps
]
// the main tween which holds the position of the timeline
const pos = tweened(0, {duration: timelime.length * stepDuration})

function play() {
  // get the total duration of the timeline
  const totalDuration = timeline.length*stepDuration

  // compute the time played from each step
  const timePlayed = timeline.reduce((acc, step) => {
    // val is 1..100
    const val = get(step.tween) || 0

    // compute how many milliseconds were played
    const playedMs = val/100 * stepDuration

    return acc + playedMs
  }, 0)

  // compute time remaining
  const remaining = totalDuration-timePlayed

  // trigger the movement of the timeline, using remaining time
  pos.set(timeline.length, {duration: remaining})
}
```

## Here's the code:

https://svelte.dev/repl/eff2ec6d0c53476499e042f1db424fcd?version=3.35.0

## Here's what it looks like:

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1615408819/1000experiments.dev/nested-tweens-with-continuation_sn9hlz.mp4"/>
