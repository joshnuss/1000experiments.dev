---
title: "Code animation: Layout adjustments"
experiment: 155
date: "2021-04-25"
permalink: layout-adustments
tags: svelte, code-video
---

In a past experiment, I added [resizing to the layout](/posts/layout-resize).

When I [integrated it into the project](/posts/screen-editor-intergration), it behaved weirdly when the timeline's height get taller, the header goes off screen. So this experiment revists the layout to fix the problems with it.

## Problem

The outer layout uses flexbox. So adjusting one part - like increasing the height of the timeline/footer - impacts the expansion of other areas.

## Solution

Use a fixed layout `position: fixed` for the header, sidebar and footer. Only the `<main>` content should use flexbox.

- The footer and sidebar's [size should be adjustable](/posts/layout-resize).
- Sidebar should be hidden unless selected.
- Animate the sidebar when it becomes visible (slide-in).
- Sidebar should not overlay the header or footer. It's height should be dynamically calculated.

## Code

https://svelte.dev/repl/310ddf1eded8432a921c2c17e5c23a7f?version=3.37.0

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1619369688/1000experiments.dev/resizable-layout-with-fixed-elements_fbvhtd.mp4"/>
