---
title: Code editor with elastic typing
experiment: 25
date: "2021-03-07"
permalink: code-editor-typing-elasticity
tags: code-video, svelte, animation
---

I added support for easing functions that are elastic. Elasticity is a challenge because the cursor can move backwards, which means issuing a backspace event.

It took a bit of work, and it hindsight, may not be that useful. But I still learned something important from it.

It was hard because of 2 reasons:

1. **My code was hard to debug**. Once I added better support for debugging (outputing data), I solved the problems quickly. It's a good reminder that when debugging gets tough, it's a signal to stop debugging and change the code to make it easier to debug. Brute force debugging never works.
2. **This codebase has become a set of integrated experiments**. But it's important to experiment in isolation to limit the variables. Otherwise everything slows down.

Integration is a key part too, and could be thought of as it's own experiment. Just need to be careful to keep intergration intentional.

I will try these methods going forward and see what happens.

## Here's the code:

https://github.com/joshnuss/svelte-codemirror-test/commit/fa2ef57a7198b61857607afa50dcbcd408f91dbd

## Here's what it looks like:

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1615160771/1000experiments.dev/typing-elasticity_bmduli.mp4"/>
