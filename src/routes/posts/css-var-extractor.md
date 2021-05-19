---
title: Visually extract CSS variables
experiment: 45
date: "2021-03-14"
permalink: css-var-extractor
tags: css, svelte
---

Last week I built a [VIM plugin to extract CSS vars](/posts/vim-extract-css-var).

Today I experimented with expanding that idea into a visual tool.

The idea is that you would copy and paste your stylesheet into the tool, and it parses it and let's you select which parts should be turned into vars.

It can event be taken further:

- If a value `red` is being extracted to a var, it could replace all CSS properties that use `red` with new var.
- If the var is renamed, it could rename it everywhere.
- Would make it easy to setup vars that change based on different breakpoints.
- It could find the most used property values. ie if you used `1px` a ton of times, it could suggest it be a var.
- Could be changed to run as a desktop app. With access to the filesystem, it ould edit all the css files in a project at once, add show how it would look under different viewpoint/breakpoint sizes.

## Code

https://svelte.dev/repl/672889ae5dc34287ad4265c284f4f4ea?version=3.35.0

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1615709186/1000experiments.dev/css-var-extractor_xl0gx6.mp4"/>
