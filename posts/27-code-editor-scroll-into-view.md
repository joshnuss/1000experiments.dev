---
title: Code editor scroll into view
experiment: 27
date: "2021-03-07"
permalink: code-editor-scroll-into-view
tags: code-video, svelte, animation
---

When demonstrating code, the animation may have to move to different lines in a file. So I built a "scroll into view" routine, that animates the scroll position to a specific line.

```javascript
function scrollIntoView(line) {
  // find number of lines
  const lines = editor.lineCount()
  // get info about the scroll height of the editor element
  const scrollInfo = editor.getScrollInfo()
  // compute line height
  const lineHeight = scrollInfo.height/lines
  
  // clear previous marks
  editor.getAllMarks().forEach(mark => mark.clear())
  // mark the line with css class `.highlight`
  editor.markText({line, ch: 0}, {line, ch: 10000}, {className: 'highlight'})

  // set up a tween, starting at the current scrolltop position
  scrollY = tweened(scrollInfo.top, {duration: 300})
  // when tween value changes, scroll the editor
  scrollY.subscribe(y => {
    editor.scrollTo(0, y)
  })

  // trigger the tween, by telling it the end point to go to
  scrollY.set(lineHeight * line)
}
```

Thanks to my last experiment, where I extracting reusable components, I was able to run this experiment very quickly, by doing it in isolation in a REPL.

## Here's the code:

https://svelte.dev/repl/8a524121ef9a4372a0b0787e23e8bda9?version=3.35.0

## Here's what it looks like:

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1615174948/1000experiments.dev/scroll-into-view_zxqirj.mp4"/>
