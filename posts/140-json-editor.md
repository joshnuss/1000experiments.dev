---
title: "Code animation: JSON editor"
experiment: 140
date: "2021-04-18"
permalink: json-editor
tags: svelte, code-video
---

Before I start building out the timeline view for the code animation project, it wold be handy to have a JSON editor that I can use to edit the underlying document.
It makes it easier to debug different scenarios by editing the JSON or copying and pasting in examples.

## Editor

The JSON editor is just another use of [codemirror](https://codemirror.net) where the code is parsed and data bound in realtime.

The only hitch is that when the JSON changes, the file needs to get rebuilt, and sometimes there will be errors. So it needs to show those errors.

Also, I prefer to use [`json5`](http://npmjs.com/package/json5) instead of the built-in `JSON`, as it's a more leniant parser.

## Code

```html
<!-- CodeEditor.svelte -->
<script>
  import JSON5 from 'json5'
  import CodeMirror from './CodeMirror.svelte'
  import { document } from '$lib/document'

  export let code
  
  let error

  $: {
    // parse JSON and capture errors
    try {
      $document = JSON5.parse(code) 
      error = null
    } catch (e) {
      // capture error for display
      if (e.name == 'SyntaxError') {
        error = e
      } else {
        console.error('unknown error', e)
      }
    }
  }
</script>

<div class="container">
  {#if error}
    <!-- display error message -->
    <div class="error">
      Syntax error: {error.message.substr(7)}
    </div>
  {/if}

  <CodeMirror language="javascript" bind:code lineNumbers/>
</div>
```

## Snapshot

https://gitpod.io#snapshot/3587d208-f3ef-42a0-af94-45740d950e2d

## Demo

<video src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1618732240/1000experiments.dev/json-editor_q7eggp.mp4" controls/>

## Notes

- Updating JSON settings, like `height`, `width` settings, update the controls immediately. Should it work in other direction too?
