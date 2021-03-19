---
title: Figuring out bugs
experiment: 58
date: "2021-03-19"
permalink: ssr-dynamic-import
tags: bug, svelte, code-video
---

Found a useful thing I found today:

When you encounter a bug, you can try to brute force your way through it, but there's no guarantee that solves it.

Another approach is to use the magic of experements.

ie. create a brand new project (which eliminates variables), and try to reconstruct the problem with a minimal number of steps.

By doing that, one of two things will happen:

- You find that you didn't have a complete understanding of the problem.
- If it works, that means there was another variable at play. Now go find that variable.

Either way, you made progress.

## SSR bug

This is precisely what happened to me today. I was banging my head trying to render my code animation thing from a server-rendered project. The problem was that the project depends on `codemirror`, which can only render on the client side. I thought it would be easy to check `if (window) ...`. But, no, that didn't work, nothing seemed to work. Eventually it occured to me try an experiment... and boom, solution found.

The solution was to use dynamic import inside `onMount()`, see below:

But the more important was the reminder that experiments are how bugs are solved.

## Code

```html
<script>
  import { onMount } from 'svelte'

  const options = {
    readOnly: true,
    lineNumbers: false,
    mode: "javascript",
    value: "function test() {\n\t\n}"
  }

  let CodeMirror, editor

  onMount(async () => {
    // dynamically import npm packages at runtime
    const mod = await import('@joshnuss/svelte-codemirror')
    await import('codemirror/mode/javascript/javascript')

    CodeMirror = mod.default
  })
</script>

<!-- dynamically display component -->
{#if CodeMirror}
  <svelte:component this={CodeMirror} {options} bind:editor/>
{/if}
```
