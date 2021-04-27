---
title: "Code animation: Event editor"
experiment: 156
date: "2021-04-26"
permalink: event-editor
tags: code-video, svelte
---

This integrates the previous experiment where I researched creating a [DSL for defining property editor components](/posts/property-ui-dsl).

## EventEditor component

The `<EventEditor>` component contains all the inputs for editing an event. Depending on the type of event (ie `append`, `insert`, `scroll`, etc..), additional fields are conditionally displayed.

Here's what the component looks like:

```html
<!-- EventEditor.svelte -->
<script>
  import { document } from '$lib/document'
  import { Section, TextField, SelectField } from '$lib/components/properties'
  import { easingFunctions } from './easing'
  import AppendEditor from './events/AppendEditor.svelte'

  export let event

  const types = [
    { label: "Append", value: 'append' },
    { label: "Insert", value: 'insert' },
    { label: "Delete", value: 'remove' },
    { label: "Replace", value: 'replace' },
    { label: "Select", value: 'select' },
    { label: "Scroll", value: 'scroll' }
  ]

  // for now only AppendEditor exists. TODO.
  const components = {
    append: AppendEditor,
    insert: AppendEditor,
    remove: AppendEditor,
    replace: AppendEditor,
    select: AppendEditor,
    scroll: AppendEditor,
  }
</script>

<Section title="Type">
  <SelectField name="type" bind:value={event.type} options={types}/>
</Section>

<Section title="Label">
  <TextField name="label" bind:value={event.label}/>
</Section>

<Section title="Effects">
  <TextField name="duration" label="Duration (ms)" type="number" bind:value={event.duration} min={0} step={10}/>
  <SelectField name="easing" label="Easing" bind:value={event.easing} options={easingFunctions}/>
</Section>

<Section title="Caption">
  <TextField name="caption" bind:value={event.caption}/>
</Section>

<svelte:component this={components[event.type]} bind:event/>
```

And the `AppendEditor.svelte` looks like this:

```html
<script>
  import { document } from "$lib/document"
  import {
    Section,
    CodeField,
    CheckboxField,
  } from "$lib/components/properties"

  export let event
</script>

<Section title="Code">
  <!--
  <CodeField name="code" language={$document.window.language} bind:code={event.text} />
  -->
</Section>

<Section title="Options">
  <CheckboxField name="typewriter" label="Typewriter Effect" bind:value={event.typewriter} />
  <CheckboxField name="highlight" label="Highlight" bind:value={event.highlight} />
</Section>
```

## Snapshot

https://gitpod.io#snapshot/8251fc1f-2aca-4095-b5b9-897d3957dc4b

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1619491532/1000experiments.dev/event-editor_gt0eo3.mp4"/>

## Notes

- Bug: CodeField is throwing errors.
- Bug: Changes to event are not reflected on timeline.
- Add editors for each type of event (scroll, select, insert, delete, replace)
