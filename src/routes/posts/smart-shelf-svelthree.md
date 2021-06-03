---
title: "Smart shelf: Svelthree"
experiment: 198
date: "2021-06-02"
permalink: smart-shelf-svelthree
tags: svelte, 3d
---

Continuing with my [idea for an AR bookshelf](/posts/smart-shelf).

I started looking into what it would take to use AR with [three.js](https://threejs.org/). There are some [good example here](https://threejs.org/examples/?q=xr#webxr_ar_lighting).

For today, I started with just setting up the 3D scene using [svelthree](https://svelthree.dev) and making a cube look like a book by painting it with an image texture.

## Code

https://svelthree.dev/repl/2d0433e175bd43b4bd1b1ecb248e0854?version=3.38.2

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1622692112/1000experiments.dev/svelthree-books_ednqi0.mp4"/>

## Notes

- The texture should have an image for each of the 6 sides of the book. Front, back, side, etc..
- Highlight book
- If there are many books (ie some are offscreen), show arrows
- Integrate with AR using fiducial markers. The fiducials will go on the shelf corners.
