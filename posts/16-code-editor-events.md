---
title: Code editor events
experiment: 16
date: "2021-03-04"
permalink: code-editor-events
tags: code-video, svelte, animation
---

One use-case is integrating the video animation with accompanying content on the page. For example, you might want to synchronize an article or documentation with the editor.

So I added events for when the timeline start/stops and when steps start/stop.

```html
<div id="editor"
  on:timelinestart={...}
  on:timelineend={...}
  on:stepstart={...}
  on:stepend={...}
  />
```

The event contains the `step` data, which the event handler can use to scroll or change the accompanying content.

Here's the code:

https://github.com/joshnuss/svelte-codemirror-test/commit/2c5732a138f74a7d68df1f66bb75908e8907aad9

Here's a video:

The events are displayed at the bottom, in the DevTool's console.

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1614895995/1000experiments.dev/code-editor-events_gi0ujc.mp4"/>
