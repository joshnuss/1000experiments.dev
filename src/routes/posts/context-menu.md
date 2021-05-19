---
title: "Code animation: Context menu"
experiment: 124
date: "2021-04-12"
permalink: context-menu
tags: code-video, svelte
---

To add events the timeline view, a good approach is to use a context menu.

## Using the `<ContextMenu/>` component

To use it you define a `<ContextMenu/>` and pass it a list of menu items:

```html
<script>
  // each menu item has an optional handler and shortcut
  const items = [
    { label: "Option #1", shortcut: "CTRL+1", handler: () => alert("You clicked option #1") },
    { label: "Option #2", shortcut: "CTRL+2", handler: () => alert("You clicked option #2") },
  ]

  let contextMenu
<script>

<ContextMenu bind:this={contextMenu} {items}/>
```

And then you can wire up an event handler to `on:contextmenu`. This could be done on any element or to make it work globally, on the `window` by using `<svelte:window>`.

```html
<!-- punt event handling to the <ContextMenu> component -->
<svelte:window on:contextmenu={contextMenu.show}/>
```

## Code

https://svelte.dev/repl/697820c1fb92462daea82c2b26244ecd?version=3.37.0

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1618257613/1000experiments.dev/context-menu_axch2i.mp4"/>

## Notes

- Alternatively, it could be implemented as an action.
- It should handle placement better. It can't assume there is always space under the click point. For example, if opened near the bottom of the back, the menu position should use `bottom: event.pageY` instead of `top: event.pageY`
