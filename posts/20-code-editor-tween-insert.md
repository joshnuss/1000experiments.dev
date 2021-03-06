---
title: Tweening inserts
experiment: 20
date: "2021-03-06"
permalink: code-editor-tween-insert
tags: code-video, svelte, animation
---

Continuing with my experiments on tweening inserts, I incorporated yesterdays learnings into the code animation thing.

I found that elastic type easing is harder here, because it means issuing backspaces to CodeMirror (the text editor widget I'm using). That still needs to be worked out, but it works great for non-elastic easing.

Very pleasnt to watch, if I do say so myself.

## Here's what it looks like so far:

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1615013104/1000experiments.dev/code-editor-tween-insert_frzxkz.mp4"/>
