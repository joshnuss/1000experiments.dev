---
title: Tooltip action with SVG support
experiment: 207
date: "2021-07-14"
permalink: tooltip-action-svg
tags: svelte, svg
---

I found this great [example from Dana Woodman](https://dev.to/danawoodman/svelte-quick-tip-using-actions-to-integrate-with-javascript-libraries-tippy-tooltips-2m94) for adding tooltips with [tippy.js](https://atomiks.github.io/tippyjs/) using Svelte actions.

## Adjustments

I made a few adjustments to it.

- **SVG compatibility**: With an svg element, accessing the title view accessor, ie `node.title`, is not possible. Switched it to `node.getAttribute('title')`
- **Update aware**: When content changes, for example `use:tooltip={{content: someVar}}`, if `someVar` changes we want to update the content. This is especially important when using content bound to an element, ie `use:tooltip={{content: someElement}}`, because `someElement` might not be defined when the action is first setup.

## Code

https://svelte.dev/repl/a362cab7150844dd8e55ad9d8e9a5ca4?version=3.38.3

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1626238525/1000experiments.dev/tooltip-tippy-action_cqhdmm.mp4"/>
