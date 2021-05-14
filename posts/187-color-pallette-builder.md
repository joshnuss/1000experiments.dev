---
title: Color pallette builder
experiment: 187
date: "2021-05-14"
permalink: color-pallette-builder
tags: svelte
---

I was reading the [Refactoring UI book](https://www.refactoringui.com/), and the approach they recomended for picking colors was to pick a color on each side of the pallette (the boldest color and weakest color). Next, choose a color at the halfway point. Repeat this until you have a full pallette, ie 9 items.

So I put together an example, it's not finished yet, but it partially works, so I'm considering it a completed experiment.

The cool thing is, it animates the pallette as more colors are added, using svelte's [crossfade transition](https://svelte.dev/tutorial/deferred-transitions) and uses [d3-color](https://github.com/d3/d3-color) to aproximate a color halfway between 2 colors.

It also generates the CSS variables for you, ie:

```css
--primary-color-100: ...;
--primary-color-200: ...;
--primary-color-300: ...;
--primary-color-400: ...;
--primary-color-500: ...;
```

So you can copy & paste directly into your project.

## Code

https://svelte.dev/repl/c049d685a16e442fa11281909cb5dac4?version=3.38.2

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1620979200/1000experiments.dev/color-pallette-builder_f0tbox.mp4"/>

## Notes

- Add a HSL color picker. Maybe use d3-color?
