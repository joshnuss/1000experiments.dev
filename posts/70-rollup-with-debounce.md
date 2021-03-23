---
title: Rollup with debounce
experiment: 70
date: "2021-03-22"
permalink: rollup-with-debounce
tags: svelte
---

When we send notifications, there is always the posibilitity of a "pingapocalypse" - where so many messages get sent individually that they turn into noise.

One aproach is to group all activities that happen around the same time, into one set, aka "rollup". Then we can send one notification for the entire set. This is similar to what Twitter and others do.

This is an experiement to use debouncing logic to do the rollup.

## Code

https://svelte.dev/repl/9c3e97ab34af408cba3e04db1ee04b12?version=3.35.0

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1616459141/1000experiments.dev/rollup-with-debounce_ocujrp.mp4"/>
