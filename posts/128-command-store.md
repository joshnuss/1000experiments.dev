---
title: Svelte command store
experiment: 128
date: "2021-04-14"
permalink: command-store
tags: code-video, svelte
---

When UIs have many options, it's a good idea to provide a way to undo the last change. Just in case a mistake is made.

From a software design perspective, anytim you need undo/redo means you want to reach for the Command Pattern. With the command pattern, we don't just mutate data directly, we track a log of each change. The log gives us the ability to replay changes later.

## Command store API

The default `writable` store API provides `.set()` and `.update()` to mutate the store, but we can't recover the state after it's applied:

```javascript
const store = writable(initialValue)

// mutate store
store.set(state1)

// mutate store again
store.update($store => state2)

// state1 is now lost and we can't recover it
```

Our store will need a bit more information to apply a change.

The API would look like this:

```javascript
// commandStore is a store that mutates via commands
// it gets a list of values and list of commands
const store = commandStore(initialValue, commandList)

// apply a command by passing the command name
// it logs the command and mutates the state
store.execute(commandName, args)

// undo the last command
store.undo()

// or redo it
store.redo()
```

## Commands

When the store is defined, we'll pass a list of available commands. Each command is just an `object` that has two functions: `forward()` and `reverse()`.

```javascript
const store = commandStore(initialValue, {
  // `updateSettings` is the command name
  updateSettings: {
    // apply change
    forward(state, settings) {
      const previous = state.settings
      state.settings = settings

      // NOTE: we always return the previous value
      // we need that for replaying this in reverse
      return { state, previous }
    },

    // undo change
    reverse(state, previous) {
      // apply the previous value
      state.name = previous

      // return the updated state
      return state
    },
  },

  // ... more commands here
})
```

## Implementing the command store

The command store piggy-backs off Svelte's `writable()` store, but it provides a different API:

- `commandStore.subscribe(cb)`
- `commandStore(initialValue, commands)` - Creates a command store. Requires and initial value and a list of command handlers.
- `commandStore.execute(commandName, args)` - Executes a command, `args` is optional.
- `commandStore.undo()` - Undo the command before the current pointer.
- `commandStore.redo()` - Redo the command after the current pointer.
- `$commandStore.value` - Current value of the store.
- `$commandStore.stack` - List of mutations/commands that were executed.
- `$commandStore.pointer` - Position of the last executed command in the stack.

Here's what the code looks like:

```javascript
import { writable } from 'svelte/store'

// define a factory method for a command-style store
export default function commandStore(initialValue, commands) {

  // define a store
  const store = writable({
    value: initialValue,
    stack: [], // where the list of commands go
    pointer: 0 // the current position of stack
  })

  // execute applies the command in a forward direction
  // and pushes it onto the stack
  store.execute = (type, args) => {
    store.update(({value, pointer, stack}) => {
      // find the command
      const command = commands[type]
      // execute it
      const { state, previous} = command.forward(value, args)

      // update the state, increase the pointer, and push onto the stack
      return {
        value: state,
        pointer: pointer + 1,
        stack: [...stack,  { type, args, previous }]
      }
    })
  }

  // undo reverses a command
  store.undo = () => {
    store.update($store => {
      const {value, pointer, stack} = $store

      // cannot go back
      if (pointer == 0) return $store

      // get the command data from the stack
      const { type, args, previous } = stack[pointer-1]
      // find the command
      const command = commands[type]
      // execute the command in the reverse direction
      const updated = command.reverse(value, args, previous)

      // update the state and pointer
      return { value: updated, pointer: pointer - 1, stack }
    })
  }

  // redo re-runs a command in the forward direction
  store.redo = () => {
    store.update($store => {
      const {value, pointer, stack} = $store

      // cannot go forward
      if (pointer == $store.stack.length) return $store

      // get the command data from the stack
      const { type, args } = stack[pointer]
      // find the command
      const command = commands[type]
      // execute the command in the forward direction
      const updated = command.forward(value, args)

      // update the state and pointer
      return { value: updated.state, pointer: pointer + 1, stack }
    })
  }

  return store
}
```

## Code

https://svelte.dev/repl/f41d2e0055ab47a4bc873c92fc56484b?version=3.37.0

## Demo

<video src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1618382313/1000experiments.dev/command-store_z7n04h.mp4" controls/>

## Notes

- Support uncommitted changes. For example, the user is editing some setting, the changes should take effect immediately while they are typing, even if the command is only applied when they leave the field.
