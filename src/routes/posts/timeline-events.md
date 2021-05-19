---
title: Timeline events
experiment: 32
date: "2021-03-09"
permalink: timeline-events
tags: animation, svelte, code-video
---

Today I looked at adding events to the timeline. It turned out to be fairly straightforward.

The timeline is an SVG, and each event is a `<rect/>`. It was just a matter of computing the time offset of each event, and using that as the `x` value of the rect.

For example, an event with `duration: 1000` and `pause: 300`, takes a total time of `1000 + 300 = 1300`, so the next event's offset is `1300`. It's fairly easy to compute with a `reduce` operation:

```javascript
// reduce thru each step in the timeline
totalDuration = timeline.reduce((offset, step) => {
  // use rolling summary as offset
  step.offset = offset
  // compute total time of this step
  step.totalDuration = step.duration + step.pause

  // accumulate
  return offset + step.totalDuration
}, 0)
```

Clicking on an event opens up a form where it can be edited. In the future, that might look like a "property editor" style UI.

## Here's the code:

https://svelte.dev/repl/9435dbe638264a89a854e2a8648371d8?version=3.35.0

## Here's what it looks like:

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1615344044/1000experiments.dev/timeline-events_rbe5c0.mp4"/>
