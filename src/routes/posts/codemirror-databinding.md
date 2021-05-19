---
title: "Code animation: Codemirror data-binding"
experiment: 153
date: "2021-04-24"
permalink: codemirror-databinding
tags: code-video, svelte, codemirror
---

In [experiment #149](/posts/screen-editor-intergration), there was a bug where the `<CodeMirror/>` component was not databinding the code value properly. This experiment will investigate how to fix it.

## Problem

[CodeMirror](https://codemirror.net) is a vanilla JavaScript library, so it has no concept of Svelte's data-binding.

## Solution

Simulate 2-way data binding by:

1. capturing `change` events, and updating the underlying value
2. reacting to updates of the underlying value and notifying codemirror by calling `setValue()`.

```javascript
$: if (editor) {
  editor.on('change', () => {
    // update code when editor changes
    code = editor.getValue()
  })
}

$: if (editor) {
  // update editor when code changes
  editor.setValue(code)
}
```

## Challenge

When updating the editor via `setValue()`, the cursor position is lost. A workaround is to capture the previous cursor position by calling `getCursor()`, updating the value by calling `setValue()`, and then restoring the cursor with `setCursor()`.

Here's an example:

```javascript
export let code

$: if (editor) {
  // get current cursor
  const pos = editor.getCursor()

  // update the code
  editor.setValue(code)

  // restore the cursor position
  editor.setCursor(pos)
}
```

## Code

https://svelte.dev/repl/073baa4a1ce64d459543ce15a9ecccad?version=3.37.0

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1619314028/1000experiments.dev/codemirror-2-way-databinding_vuwyvj.mp4" />

## Notes

- Make sure `change` event is wired up only one time.
