---
title: Animated scrolling
experiment: 11
date: "2021-03-02"
permalink: code-editor-scrolling
tags: animation, svelte, code-video
---

Continuing on with the animated code editor. I added the ability to scroll vertically and horizontally. The cool thing is it uses Svelte's [`tweened`](https://svelte.dev/docs#tweened) store, so the scroll effect has easing and duration. As opposed to changing instantly, which would be jarring.

Here's the code:

https://github.com/joshnuss/svelte-codemirror-test/commit/c4a45c0489ce14cd2ef7fb621b9838da455a06e0

Here's what it looks like:

![Animation](/images/animated-scroll.gif)
