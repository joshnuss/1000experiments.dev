---
title: Code editor commands
experiment: 29
date: "2021-03-09"
permalink: code-editor-commands
tags: code-video, svelte, animation
---

Started thinking about how to integrate some of the code editor experiments.

Since there are many types of animations, I looked into organizing them using the command pattern:

```javascript
const commands = {
  insert() {
    // ...
  },
  append() {
    // ...
  },
  delete() {
    // ...
  },
  scroll() {
    // ...
  },
  select() {
    // ...
  },
  reset() {
    // ...
  },
}
```

And then a timeline definition would look like:

```javascript
const timeline = {
  code: "initial code here"
  duration: 1000, // How long each step should take. Can be overwritten at step level
  pause: 500, // How long to pause after each step completes.

  // define the steps to execute
  // each step requires a `type` attribute and can have `duration` & `pause` set (optional, defaults to timeline settings).
  // all other attributes are params specific to the command.
  steps: [
    { type: "append", text: "hello" },
    { type: "append", text: " " }
    { type: "append", text: "world!" }
  ]
}
```

As we move thru the timeline, each command is executed based on the `type` (`insert`, `append`, etc..). 

The step has 3 phases:

- `start` called at the beginning of the tween
- `tween` called repeatedly as the tween progresses
- `end` called at the end of the twen

Phases are optional. That mean a command should implement only the phases it cares about.

Here is an example of complex command:

```javascript
const commands = {
  // declare a command type for `delete`
  delete(editor, step) {
    // the end position
    const end = step.pos

    // the start position if the initial position minus how many chars we're deleting
    const start = step.pos - step.length

    return {
      start() {
        // select the text, and add a CSS class so the user sees what we're about to delete
        editor.select(start, end, {className: 'deleting'})
      },
      end() {
        // replace the selection with an empty string
        // effectively deleing the text
        editor.replaceSelection("")
        // set the cursor to the start of deletion
        editor.setCursor(start)
      }
    }
  }
}
```

Built the whole thing in a Svelte REPL, clicked Save... and the REPL didn't save it start called at the beginning start called at the beginning 😭. So I'll do it again tomorrow.
