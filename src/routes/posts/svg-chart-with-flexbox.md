---
title: SVG chart with flexbox
experiment: 209
date: "2021-07-14"
permalink: svg-chart-with-flexbox
tags: svg, chart, svelte
---

While [adding charts to a project](/posts/carrierwave-charts-plan), I noticed it didn't fill the space correct. I want it to expand to fill the whole space while preserving the aspect ratio.

## Solution

I set the `perserveAspectRatio` on the `<svg>` to `xMidYMid meet`, the `width` to `100%`. Then I wrapped everything in a flexbox `<div>`, and that seemed to do the trick.

## Code

https://svelte.dev/repl/ba2ae9582dba4d1c9d86ab145d1706b8?version=3.38.3

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1626245426/1000experiments.dev/svg-chart-with-flex_dbqx6x.mp4"/>

## Notes

- Does this work in non-chrome browsers?
- Does it work with really tall content?
