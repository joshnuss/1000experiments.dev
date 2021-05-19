---
title: "Code animation: Property UI components 4"
experiment: 139
date: "2021-04-17"
permalink: code-animation-property-ui-components-4
tags: svelte, code-video
---

[Continuing](/posts/code-animation-property-ui-components) to build out controls for the [property grid](/posts/property-ui-dsl).

This experiment will look at implementing the `PositionField` control:

## PositionField component

The position field is actually 2 inputs, the "line number" and "character number", seperated by a colon. I considered using a masked input, but I think 2 inputs would work better, since line and char are 2 distinct values.

Though, instead of using `<input type=number>` for the values, I used `<span>` with `contenteditable=true`, this is done to hide the up/down arrows and shrink the input size, ie. if there is only one character, it should only take up one character space. It was hard to do with just an input.

It also meant handling `keydown` events, to block non-numeric characters and handle `ArrowUp`/`ArrowDown` keyboard events.

Here's the code:

```html
<script>
  import Field from './Field.svelte'

  export let orientation = 'vertical'
  export let label = null
  export let line = 0, char = 0

  // handle keydown to prevent non-numeric keys
  // while still supporting ArrowUp/ArrowDown
  function keydown(event) {
    if (event.key == 'ArrowUp') {
      event.preventDefault()

      // increment value
      event.target.innerHTML = Number(event.target.innerHTML) + 1
      return
    }

    if (event.key == 'ArrowDown') {
      event.preventDefault()

      // decrement value
      // cannot be less than 0
      event.target.innerHTML = Math.max(0, Number(event.target.innerHTML) - 1)
      return
    }

    // prevent non-numeric letters
    if (event.key.length == 1 && !('1234567890'.split('').includes(event.key))) {
      // eat event and stop bubbling
      event.preventDefault()
      event.stopPropagation()
    }
  }
</script>

<Field {orientation} {label} for="line">
  <div class="input-container">
    <span role="textbox" contenteditable bind:innerHTML={line} type=number min=0 placeholder="line" on:keydown={keydown}/>
    <span class="spacer">:</span>
    <span role="textbox" contenteditable bind:innerHTML={char} type=number min=0 placeholder="char" on:keydown={keydown}/>
  </div>
</Field>
```

## Snapshot

https://gitpod.io#snapshot/af46e314-e9b8-48c6-b499-978cac1bfeaf

## Demo

<video src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1618639753/1000experiments.dev/position-field_xgiqe7.mp4" controls/>

## Notes

- Is it worth not using `<input>`? is there an alternative way that would be easier
