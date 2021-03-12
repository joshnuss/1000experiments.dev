---
title: Undoing nested animations
experiment: 39
date: "2021-03-12"
permalink: undo-nested-animation
tags: animation, svelte
---

In this experiment, I explored how to undo nested animations.

By keeping of a stack of running animations, I can reverse each animation by walking backwards thru the stack and reversing each animation.

## Code

https://svelte.dev/repl/090e464841fb4aa5883f1ab8c254d925?version=3.35.0

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1615532597/1000experiments.dev/undo-animation_wxv5gb.mp4"/>
