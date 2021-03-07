---
title: Extract a CSS var with VIM
experiment: 24
date: "2021-03-06"
permalink: vim-extract-css-var
tags: vim
---

To make a site responsive, CSS rules are often turned into variables.

Today I explored creating a plugin to make that a bit easier.

## How it works:

Place your cursor on any css and invoke the plugin, and it will turn the current line into a CSS var.

```css
/* before */
color: red

/* after */
color: var(--color)
```

The definition for the var `--color: red` is placed in your copy & paste register so you can paste it near your other vars.

## Here's the code:

https://gist.github.com/joshnuss/6c4fa23a860e4e2c4d0a0658aadca50d

## Here's what it looks like:

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1615083948/1000experiments.dev/vim-extract-css-var_yrz3xv.mp4"/>
