---
title: "Code animation: Animation store"
experiment: 169
date: "2021-05-02"
permalink: svelte-animation-store
tags: svelte, code-video
---

This is an integration of 2 experiments I did around Svelte's tweened store:

- [#35 Pausable tweened store](/posts/pausable-tween-store)
- [#37 Reversable tween store](/posts/reverse-tween)

## Code

I packaged up the code. It's an alpha version:

- [GitHub Repo](https://github.com/joshnuss/svelte-animation-store)
- [NPM package](http://npmjs.com/package/svelte-animation-store)
- [REPL](https://svelte.dev/repl/9751df15d22245f691a1cf3a30c3b7b4?version=3.35.0)

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1620013845/1000experiments.dev/svelte-animation-store_smea0d.mp4"/>

## Notes

- Does not honor the position of the easing function. See [#48](https://1000experiments.dev/posts/restoring-easing-function)
