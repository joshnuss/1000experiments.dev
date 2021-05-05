---
title: "Code animation: Drag all events"
experiment: 172
date: "2021-05-04"
permalink: drag-all
tags: svelte, code-video
---

In a [previous experiment](/posts/drag-snap-move-resize), I added the ability to drag and move events on the timeline.

The problem is when you have many events, and you want to move a single event. Should the adjustment impact other events? or just this one?

One solution is to have a modifier key, say `Control`. When `Control` is pressed and an event is expanded, it adjusts all events, not just the selected one. So if you expand on the right side, all **following** events shift over. If you expand on the left side, all **preceeding** events shift over.

## Code

https://svelte.dev/repl/c57e77c89812454ea86f1342a3b7486d?version=3.37.0

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1620182134/1000experiments.dev/drag-expand-all_ued66v.mp4"/>

## Notes

- This doesn't handle grid snapping properly. Will have to look into that.
