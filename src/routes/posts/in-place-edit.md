---
title: "Code animation: In place edit"
experiment: 158
date: "2021-04-27"
permalink: in-place-edit
tags: svelte, code-video
---

For the [code animation](/tag/code-video) project, I'd like the title of the document to be editable. So I'm going to reuse a component I built for the [supabase-kanban project](https://github.com/joshnuss/supabase-kanban).


## Usage

It's straightforward to use:

```html
<h1>
  <InPlaceEdit bind:value={$document.title}/>
</h1>
```

## Code

```html
<!-- InPlaceEdit.svelte -->
<script>
  import { createEventDispatcher, onMount } from 'svelte'

  export let value

  const dispatch = createEventDispatcher()
  let editing = false, original

  onMount(() => {
    original = value
  })

  function edit() {
    editing = true
  }

  function submit() {
    if (value != original) {
      dispatch('submit', value)
    }
    editing = false
  }

  function keydown(event) {
    if (event.key == 'Escape') {
      event.preventDefault()
      value = original
      editing = false
    }
  }

  function focus(element) {
    element.focus()
  }
</script>

{#if editing}
  <form on:submit|preventDefault={submit} on:keydown={keydown}>
    <input bind:value on:blur={submit} required use:focus/>
  </form>
{:else}
  <div on:click={edit}>
    {value}
  </div>
{/if}

<style>
  div {
    cursor: pointer;
  }
  input {
    border: none;
    background: none;
    font-size: inherit;
    color: inherit;
    font-weight: inherit;
    text-align: inherit;
    box-shadow: none;
  }
</style>
```

## Snapshot

https://gitpod.io#snapshot/e96cdffd-ba06-4434-9624-d0fbe8d6448b

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1619516626/1000experiments.dev/in-place-edit_ogksl6.mp4"/>
