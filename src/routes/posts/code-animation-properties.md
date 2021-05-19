---
title: "Code animation: UI properties"
experiment: 129
date: "2021-04-14"
permalink: code-animation-properties
tags: svelte, code-video
---

Continuing on the [property UI](/posts/editor-ui-with-property-editor) for the code animation editor.

Here is a list of properties that are needed:

### Frame

- Width
- Height
- Background color

### Window

- Width
- Height
- Background
- Border
- Shadow
- Title
- Color scheme: a list of color schemes
- Show min/max/close buttons: true/false
- Screen specific settings
    - Terminal
        - Prompt: ie ">" or "$"
        - Initial text: textbox
    - Code editor
        - Language: a list of programming languages
        - Line numbers: true/false
        - Initial text: textbox
    - Browser
        - Address
        - Initial html: textbox

### Settings

- Default duration: the default duration of each event
- Default easing function: the default easing function used for events
- CSS: a global list of CSS rules and vars

### Events

All events have this properties:

- Label
- Easing
- Duration

#### Append

- Highlight: true/false to add green background
- Typewriter effect: true/false
- Text

#### Insert

- Position: line, x+y or x+line
- Highlight: true/false to add green background
- Typewriter effect: true/false
- Text

#### Delete

- Position: line, x+y or x+line
- Highlight: true/false to add green background
- Typewriter effect: true/false
- Length

#### Replace


- Position: line, x+y or x+line
- Highlight: true/false to add green background
- Typewriter effect: true/false
- Length
- Text

#### Select

Support multiple selections. Each selection has

- Range
  - Line(s)
  - Start X,Y and end X,Y
  - Start X,Line and end X, Line
- CSS classes
- CSS styles

#### Scroll

- Horizonal: X
- Vertical: Either Y or Line

## Sharing

This one is lower priority and should probably be a modal. It requires rendering first.

## Notes

- How to deal with browser & phone UI? What is the initial display? Is it just an HTML file in an iframe? How are events transitioned? Is the HTML updatable? How to support support animations?
- Need a way to make selection visually and display selection visibly
- What is the UI for rendering?
