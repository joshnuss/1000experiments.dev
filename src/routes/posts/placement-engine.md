---
title: "Code animation: Placement engine"
experiment: 196
date: "2021-05-26"
permalink: placement-engine
tags: code-video, svelte
---

For the [context menus](/posts/context-menu), we can't assume there will always be space below the mouse cursor. That would make the menu go off-screen when the mouse is close to the bottom of the screen.

So we need some logic to determine placement.

A simple algorithm is to check where the most space is for each dimension (vertical & horizontal), and then place it there.

For example, if there is more space to the right than the left, and more space above than below, then the menu should be placed North-East of the mouse cursor.

## Code

https://svelte.dev/repl/79b8bfbfd6e54176ac0b1ed7b3647998?version=3.38.2

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1622063899/1000experiments.dev/placement-engine_vzpnev.mp4"/>
