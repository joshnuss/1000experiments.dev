---
title: "Code animation: Multiple discrete timelines"
experiment: 175
date: "2021-05-05"
permalink: multiple-discrete-timelines
tags: svelte, code-video
---

Continuing with the [discrete tween concept](/posts/discrete-tween), I looked at how I can use multiple timelines with it.

I will need this, because annotations/captions should happen on a seperate timeline than changes to the code view.

I worked out that [using delays](/posts/staggered-animation) is a good way to setup a series of tweens.

What I discovered is that sometimes tweens have a single discerete value, like the captions, there can only be one a time. Whereas the othertimeline has properties that stack over time. Will need to look into a better abstraction for this.

## Code

https://svelte.dev/repl/47b9b0a14cd0410aba1f023d253a8ac0?version=3.38.2

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1620272732/1000experiments.dev/multiple-discrete-timelines_wpzlzd.mp4"/>

## Notes

- It should be able to work in reverse too
- It seems there are two types of discrete tweens, one where there is only a single value at a time, and the other represents a stack of all past values .
