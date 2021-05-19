---
title: "Code animation: First pass on editor design"
experiment: 120
date: "2021-04-11"
permalink: code-editor-mockup-first-pass
tags: code-video, svelte, design
---

Yesterday I put together [a mockup for the code animation editor](/posts/code-animation-editor-mockup). Today I implemented much of the design as Svelte components.

This is just a first pass though. My plan is to do a rough draft to see how things fit together and to uncover where there are still elements missing, and where things are rough. Then I'll do another round of experiments figuring the challenges I encounter. (See Notes section below)

## Code

https://svelte.dev/repl/5a636a45d0164e589dccab9dcf3aad34?version=3.37.0

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1618122564/1000experiments.dev/code-animation-editor-mockup_bz4o4c.mp4"/>

## Notes

- Click on "Untitled" should turn it into edit mode, so the title can be adjusted.
- Figure out the UI for each of the action buttons in the top right-hand corner.
- Figure out how to have an infinite timeline
- What does the UI look like for adding a step to the timeline?
- What does the UI look like for editing a step (after clicking on a step)? Should it be a property grid?
- How do we choose the layout? ie Terminal, Code Editor, Browser screen, Phone screen, or a mixture of both.
- What is the best way to render tick marks in the timeline view? Should be a background image that repeats?
- When zooming in/out with slider
- Show the time of cursor and total time of animation in the timeline's navbar. ie "00:00:05 / 00:00:30"
- Need UI for adjusting frame size, ideally with preset sizes, for example twitter has perferred dimensions
