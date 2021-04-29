---
title: "Code animation: Copy & Paste"
experiment: 162
date: "2021-04-29"
permalink: copy-paste
tags: svelte, code-video
---

For the event timeline, the user should be able to copy and paste events. I built an example for [inserting using the context menu](/posts/insert-at-point). This expands on that to add copy and paste menu items.

## Clipboard API

The clipboard does not work in Svelte's REPL because of permission restrictions, so I had to do it locally. This will prompt the user to allow copy and paste.

## Code

### Copying

```javascript
async function copy() {
  if (!selected) return

  // convert selected item to blob
  // application/json is not supported :(
  const blob = new Blob([JSON.stringify(selected)], {type: 'text/plain'})

  // write the blob to the clipboard
  await navigator.clipboard.write([
    new ClipboardItem({[blob.type]: blob})
  ])
}
```

### Pasting

```javascript
async function paste() {
  // read from clipboard
  const items = await navigator.clipboard.read()

  // iterate thru clipboard items
  for (const item of items) {
    for (const type of item.types) {
      // find content type of `text/plain`
      if (type == "text/plain") {
        // get blob
        const blob = await item.getType(type)
        // get blob's text
        const text = await blob.text()

        try {
          // try to parse as JSON
          const event = JSON.parse(text)
          // publish event that we're inserting a duplicate at a new insertion point
          dispatch('add', {type: event.type, point: insertPoint})
        } catch (e) {}
      }
    }
  }
}
```

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1619709372/1000experiments.dev/copy-and-paste_tehkiv.mp4"/>

## Notes

- Support cut as well
- Alternative is to not use system clipboard
