---
title: "Code animation: Horizontal zooming"
experiment: 121
date: "2021-04-11"
permalink: horizontal-zooming
tags: code-video, svelte
---

This experiment is about how to zoom the timeline.

It uses an `<input type=range/>` to adjust the current zoom level.

```html
<input type=range bind:value={zoom}/>
```

The `scale` factor is calculated as a reactive statement:

```javascript
$: scale = zoom / 100
```

Then we can adjust the `left` and `width` position of each timeline element based on the `scale` factor:

```html
<button class="step" style="width: {step.duration*scale}px; left: {step.offset*scale}px">
  <span>{step.label}</span>
</button>
```

### Keyboard event

It also handles keyboard events:

- `CTRL+plus` to zoom in.
- `CTRL+minus` to zoom out.
- `CTRL+0` to zoom out.

All it took was handling `on:keydown` with `<svelte:window>`:

```html
<svelte:window on:keydown={keydown}/>
```

And the `keydown()` function looks like this:

```javascript
function keydown(event) {
  // handle CTRL+plus
  if (event.key == '+' && event.ctrlKey) {
    if (zoom + increment > max) {
      zoom = max
    } else {
      zoom += increment
    }
    
    event.preventDefault()
  }
  
  // handle CTRL+minus
  if (event.key == '-' && event.ctrlKey) {
    if (zoom - increment < min) {
      zoom = min
    } else {
      zoom -= increment
    }
    
    event.preventDefault()
  }
  
  // handle CTRL+0
  if (event.key == '0' && event.ctrlKey) {
    zoom = 100
    event.preventDefault()
  }
}
```

## Wrapping

One final touch was handling word wrapping. When the zoom level is very high, the text is chopped and `...` is added.
It's great that there is a pure css solution for that. In the old days that would have required code.

```css
.step {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

## Code

https://svelte.dev/repl/266f525f77c647cb97c655608df4c56e?version=3.37.0

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1618129153/1000experiments.dev/horizontal-zooming_csesuh.mp4"/>

## Notes

- Figure out how to make this work for tick marks as well.
