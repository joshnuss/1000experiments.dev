---
title: "Code animation: command store"
experiment: 128
date: "2021-04-14"
permalink: command-store
tags: code-video, svelte
---

When UIs have many options, it's a good idea to provide a way to undo the last change. Just in case a mistake is made.

From a software design perspective, undo/redo means using the Command Pattern. With the command pattern, we don't just mutate data directly, we track a log of each change. The log gives us the ability to undo changes later. It's like a log of mutations that we can replay in either direction.

## Command store API

The default writable store API, provides `.set()` and `.update()` to mutate the store.

```javascript
const store = writable(initialValue)

// mutation store
store.set(state1)

// mutation store again
store.set(state2)

// state1 is now lost and we can't recover it
```

That won't work for a command store, because after we call `.set()` or `.update()`, the previous value is lost.

We need a different interface for our store, one where we won't allow direct mutation. Our store will require a "command" to execute, and the store will run the command, mutate the state **and** persist the command onto a stack (aka the log).

The API would look like this:

```javascript
// commandStore is a store that mutates via commands
// it gets a list of values and list of commands
const store = commandStore(initialValue, commandList)

// apply a command by passing the command name
store.execute(commandName, args)

// undo the last command
store.undo()

// or redo it
store.redo()
```

## Commands

The list of available commands will be passed to the store when it is defined. Each command is just an `object` that has two functions: `forward()` and `reverse()`.

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

The command store will piggy-back off Svelte's `writable()` store. It provides 3 functions:

- `commandStore(initialValue, commands)` - creates a command store, requires and initial value and a list of command handlers.
- `commandStore.execute(commandName, args)` - executes a command, `args` is optional.
- `commandStore.undo()` - undo the command before the current pointer.
- `commandStore.redo()` - redo the command after the current pointer.
- `$commandStore.value` - current value of the store
- `$commandStore.stack` - list of mutations/commands that were executed
- `$commandStore.pointer` - the last executed position of the stack

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

  // execute applies the command in a forward direction and pushes it onto the stack
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
