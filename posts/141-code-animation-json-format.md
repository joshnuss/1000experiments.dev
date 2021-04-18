---
title: "Code animation: JSON format"
experiment: 141
date: "2021-04-18"
permalink: code-animation-json-format
tags: code-video, svelte
---

This experiment is about documenting the structure of the document. It will be in a JSON format, and stored in [supabase](https://supabase.io) as a `jsonb` column.

## Root

- `title`: name of document. Default is `Untitled`
- `settings`: general settings
- `frame`: frame settings
- `window`: window settings
- `timeline`: a list of events

## Settings

- `preset`: the color preset. Default is `light`.
- `css`: global css rules to add. Default is an empty string.
- `easing`: default easing function. Default is `linear`.
- `duration`: default duration of a timeline event. Default is `1000`.

## Frame

Settings related to the frame:

- `width`: the width of the frame. Default is `640`.
- `height`: the height of the frame. Default is `480`.
- `background`: the background color. Default is `#cccccc`.

## Window

Settings related to the code editor window

- `title`: the title of the window. Default is `code`.
- `width`: the width of the window. Default is `640`.
- `height`: the height of the window. Default is `480`.
- `controls`: wether controls should be displayed. Default is `true`.
- `border.enabled`: enable or disable border. Default is `true`.
- `border.color`: the color of the border. Default is `preset`.
- `background`: the background color of the window. Default is `preset`.
- `language`: the program language, used for syntax highlighting. Default is `javascript`.
- `lineNumbers`: whether line numbers should be displayed. Default is `true`.
- `initial`: the initial code. Default is an empty string.

## Events

All events share this properties:

- `type`: the type of the event. Can be one of `insert`, `append`, `delete`, `scroll`, `select`
- `label`: the label of the event. Default is an empty string.
- `caption`: displays a caption at the bottom the screen. Default is an empty string.
- `effect.duration`: the length of the event in milliseconds. Default is `default` which uses `settings.duration`.
- `effect.easing`: the easing function. The default is `default`, which uses `settings.easing`.

### Append

Code to append to the end of the document:

- `code`: the code to append. default is an empty string.
- `typewriter`: `true` to enabled the typewriter effect. default is `false`
- `highlight`: `true` to hightlight text while typing. default is `false`

### Insert

Code to insert into the document:

- `position`: the position to insert at. ie `{line: 10, char: 3}`. default is `{line: 0, char: 0}`
- `code`: the code to insert. default is an empty string.
- `typewriter`: `true` to enabled the typewriter effect. default is `false`
- `highlight`: `true` to hightlight text while typing. default is `false`

### Delete

Deletes code from the document:

- `position`: the position to delete at. ie `{line: 10, char: 3}`. default is `{line: 0, char: 0}`
- `length`: the number of chars to delete. default is `0`.
- `typewriter`: `true` to enabled the typewriter effect. default is `false`
- `highlight`: `true` to hightlight text while deleting. default is `false`

### Replace

Replace code in the document:

- `selection`: the position to delete. ie `{from: {line: 10, char: 3}, length: 0}`. default is `{from: {line: 0, char: 0}, length: 0}`
- `code`: the code to insert. default is an empty string.
- `typewriter`: `true` to enabled the typewriter effect. default is `false`
- `highlight`: `true` to hightlight text while removing and adding. default is `false`

### Select

A list of one or more selections

- a list of:
  - `start`: the start of the selection
  - `end`: the end of the selection
  - `scroll`: `true` to scroll to the line. Default is `false`.
- `classes`: a list of css classes. Default is `[]`
- `styles`: css styles to add. Default is an empty string.

### Scroll

Scroll the window

- `scrollType`: the type of scrolling. One of `pixel` or `line`. Default is `line`.
- `y`: the `y` position to scroll to.
- `line`: the line number to scroll to.

## Notes

- Support for multiple windows in the future
