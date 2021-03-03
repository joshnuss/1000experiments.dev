---
title: Slides of SVG
experiment: 12
date: "2021-03-02"
permalink: slides-of-svg
tags: animation, svelte
---

Continuing on with the [SVG slide thing](/posts/slide-x-y-direction). I added the ability for each slide to be it's own SVG. That means each slide can have it's own unique viewport dimensions and styling. Which results in better organized code.

The top level SVG is like the "Storyboard", and the individual SVGs are "Scenes".

```html
<!-- top level is storyboard -->
<svg viewBox="...">
  <!-- each scene/slide is a group <g>, translated to a start position with CSS -->
  <g style="transform: translate(...)">
    <!-- this is a specific scene/slide -->
    <!-- it doesn't have to be inline, it can come from a component -->
    <!-- the viewBox here is the scene's dimensions -->
    <svg viewBox="...">
      <!-- interesting stuff here -->
    </svg>
  </g>

  <!-- more scenes here -->
</svg>
```

When a scene comes into view, it's `active` prop is set to `true` which works as the trigger for the animation in the scene.

## Here's the code:

https://svelte.dev/repl/aadfa324402b46478771e5e421aa6248?version=3.35.0

## Here's what it looks like:

<video src="images/slide-of-svgs.mp4" controls/>
