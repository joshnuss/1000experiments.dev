---
title: Code editor tweened typewriter effect
experiment: 18
date: "2021-03-05"
permalink: code-editor-tweened-typewriter
tags: code-video, svelte, animation
---

Started looking into how to add easing everywhere. In this experiment, I tackled adding easing to the typewriter effect. It worked out pretty well.

It uses a `tweened` store to animate the current cursor position. What's cool is that for elastic easing functions, the negative values results in a backspace effect. (See example in video below)

Here's the code:

https://svelte.dev/repl/cb5ae4118cb04c59a08c3a380d20fe17?version=3.35.0

Here's what is looks like:

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1614923419/1000experiments.dev/typewriter-easing_wen62z.mp4"/>
