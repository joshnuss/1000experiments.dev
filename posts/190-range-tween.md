---
title: "Code animation: Range tween"
experiment: 190
date: "2021-05-17"
permalink: range-tween
tags: svelte, code-video
---

Svelte's tweened store animates between an initial value and an arbitrary value. But sometimes you want to restrict what the values can be.

This is what a "range store" does. The `from` and `to` values are defined when the store is intitialized. `store.run()` is used to animate from one to the other.

## Code

https://svelte.dev/repl/c90aea54f17c4024b467e3a33299fefa?version=3.38.2

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1621307797/1000experiments.dev/range-tween_ltyjbh.mp4"/>
