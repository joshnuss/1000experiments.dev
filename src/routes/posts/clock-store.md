---
title: A clock store with Svelte
experiment: 203
date: "2021-07-07"
permalink: clock-store
tags: svelte
---

Wiring up connections to external data usually can require interacting with multiple imperative APIs.

For example, take a clock. The current time can be captured by calling `interval = setInterval(callback, ms)` and using the callback to update state `state = new Date()`, later when the interval isn't needed, the interval timer is stopped and cleaned up by calling `clearInterval(interval)`

## Going declarative

Stores are state that have a cleanup routine and pump out messages when it changes. It allows us to put all the wiring (calling `setInterval()`/`clearInterval()`) outside our UI component.

Here's what it looks like:

```javascript
import { readable } from 'svelte/store'

export default function(options={}) {
	const initialValue = new Date()
	
	// return a readable store
  return readable(initialValue, set => {
    // the update function sets the latest date
    const update = () => set(new Date())
    
    // setup an interval timer to update the store's value repeatedly over time
    const interval = setInterval(update, options.interval || 1000)
		
    // return a cleanup function:
    // it will stop the timer when the store is destroyed
    return () => clearInterval(interval)
  })
}
```

And to use it, it's super simple:

```html
<script>
	import clockStore from './clock.js'
  
  // create the clock store, and tell it to refresh every 300ms
  const clock = clockStore({interval: 300})
</script>

<span>{$clock}</span>
```

Now our clock code is reactive, and we can share it between components if needed!

## Demo

https://svelte.dev/repl/4dc8559756cf491abe7ad8f7189a8873?version=3.38.3
