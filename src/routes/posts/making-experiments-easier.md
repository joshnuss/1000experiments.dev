---
title: Making experiments easier
experiment: 26
date: "2021-03-07"
permalink: making-experiments-easier
tags: meta, svelte
---

Going a bit meta on this one. Doing things to make future experiments easier.

Extract some UI components:

- A component that [displays a desktop window](https://svelte.dev/repl/bb0736e6fc79420a85ea10762184a1d2?version=3.35.0). It's needed for both the code animation project and the landing page.
- A component for [wrapping CodeMirror](https://svelte.dev/repl/b2c657e8c49a42b6ba6aaf3dbd7d09d5?version=3.35.0). This will make it faster to test out CodeMirror things with just a REPL

## Here's some examples:

[Preview UI REPL](https://svelte.dev/repl/bb0736e6fc79420a85ea10762184a1d2?version=3.35.0)
[CodeMirror REPL](https://svelte.dev/repl/b2c657e8c49a42b6ba6aaf3dbd7d09d5?version=3.35.0)

## Here's the NPM packages:

[@josnuss/svelte-codemirror](https://www.npmjs.com/package/@joshnuss/svelte-codemirror)
[svelte-preview-ui](https://www.npmjs.com/package/svelte-preview-ui)
