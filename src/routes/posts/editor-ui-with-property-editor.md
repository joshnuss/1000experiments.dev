---
title: "Code animation: Property editor"
experiment: 127
date: "2021-04-13"
permalink: editor-ui-with-property-editor
tags: svelte, code-video
---

An important part of any visual editor is being able to select something and edit it's properties.

So I've added a property sidebar to the UI. It's inspired by Figma's design.

The `<PropertyEditor>` component is a sidebar, and the specific thing that's being edited is inserted into it's `<slot>`:

```html
<!-- generic sidebar -->
<PropertyEditor title="Frame">
  <!-- ui for editing a specific element -->
  <FrameEditor/>
</PropertyEditor>
```

## Code

https://svelte.dev/repl/793273d521874ca7ab82759216f2f15a?version=3.37.0

## Demo

<img alt="animation" src="https://res.cloudinary.com/dzwnkx0mk/image/upload/v1618311801/1000experiments.dev/editor-ui-with-property-editor_hnl6j4.png"/>

## Notes

- Add editor components for:
  - Settings
  - Layers
  - Activities: Insert, Append, Remove, Replace, Select, Scroll
  - Sharing (or maybe that should be a modal?)
