---
title: "Code animation: Even editor types"
experiment: 157
date: "2021-04-27"
permalink: event-editor-types
tags: code-video, svelte
---

In the [last experiment I added the `<EventEditor>` component](/posts/event-editor). Part of the component is conditional on the event type.

This experiment is about building up more of that UI.

## Code

The `<InsertEditor>` component:

```html
<script>
  import { document } from "$lib/document"
  import {
    Section,
    CodeField,
    CheckboxField,
    PositionField
  } from "$lib/components/properties"

  export let event
</script>

<Section title="Position">
  <PositionField bind:value={event.position}/>
</Section>

<Section title="Code">
  <CodeField name="code" language={$document.window.language} bind:code={event.text} />
</Section>

<Section title="Effects">
  <CheckboxField name="typewriter" label="Typewriter" bind:value={event.typewriter} />
  <CheckboxField name="highlight" label="Highlight" bind:value={event.highlight} />
</Section>
```

The `<RemoveEditor>` component:

```html
<script>
  import { document } from "$lib/document"
  import {
    Section,
    CodeField,
    TextField,
    CheckboxField,
    PositionField
  } from "$lib/components/properties"

  export let event
</script>

<Section title="Position">
  <PositionField bind:value={event.position}/>
</Section>

<Section title="Length">
  <TextField name="length" type="number" bind:value={event.length} />
</Section>

<Section title="Effects">
  <CheckboxField name="typewriter" label="Typewriter" bind:value={event.typewriter} />
  <CheckboxField name="highlight" label="Highlight" bind:value={event.highlight} />
</Section>
```

The `<ReplaceEditor>` component:

```html
<script>
  import { document } from "$lib/document"
  import {
    Section,
    Fieldset,
    CodeField,
    TextField,
    CheckboxField,
    PositionField
  } from "$lib/components/properties"

  export let event
</script>

<Section title="Selection">
  <Fieldset orientation="horizontal">
    <PositionField label="Start" bind:value={event.selection.start}/>
    <PositionField label="End" bind:value={event.selection.end}/>
  </Fieldset>

  <TextField name="css" label="CSS classes" bind:value={event.selection.classes}/>
  <!-- <CodeField name="code" label="CSS styles" language="css" bind:code={event.selection.styles}/> -->
  <TextField name="code" label="CSS styles" bind:value={event.selection.styles}/>
</Section>

<Section title="Replacement">
  <!-- <CodeField name="code" language={$document.window.language} bind:code={event.text} /> -->
  <TextField name="code" bind:value={event.text} />
</Section>

<Section title="Effects">
  <CheckboxField name="typewriter" label="Typewriter" bind:value={event.typewriter} />
  <CheckboxField name="highlight" label="Highlight" bind:value={event.highlight} />
</Section>
```

The `<SelectEditor>` component:

```html
<script>
  import { document } from "$lib/document"
  import {
    Section,
    Fieldset,
    CodeField,
    TextField,
    CheckboxField,
    PositionField
  } from "$lib/components/properties"

  export let event

  function add() {
    event = {...event, selections: [...event.selections, {}]}
  }
</script>

{#each event.selections as selection, n}
  <Section title="Selection #{n+1}">
    <Fieldset orientation="horizontal">
      <PositionField name="start" label="Start" bind:value={selection.start}/>
      <PositionField name="end" label="End" bind:value={selection.end}/>
    </Fieldset>
    <TextField name="css" label="CSS classes" bind:value={selection.classes}/>
    <!-- <CodeField name="code" label="CSS styles" language="css" bind:code={selection.styles}/> -->
    <TextField name="code" label="CSS styles" bind:value={selection.styles}/>
  </Section>
{/each}

<button on:click={add}>Add</button>
```

The `<ScrollEditor>` component:

```html
<script>
  import { document } from "$lib/document"
  import {
    Section,
    TextField,
    SelectField
  } from "$lib/components/properties"

  export let event
</script>

<Section title="Position">
  <Fieldset orientation="horizontal">
    <SelectField name="select" bind:value={event.scroll.style} options={scrollOptions}/>

    {#if event.scroll.type == "pixels"}
      <TextField type="number" label="Y" bind:value={event.scroll.y} min=0/>
    {:else}
      <TextField type="number" label="Line" bind:value={event.scroll.line} min=0/>
    {/if}
  </Fieldset>
</Section>
```

## Snapshot

https://gitpod.io#snapshot/0ae010de-163b-4b84-b536-bf2dcf8805bc

## Demo

<video src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1619515673/1000experiments.dev/event-editor-types_d0hkba.mp4" controls/>

## Notes

- Changes made to property editor should be reflected in UI immediately.
- Sections should have "+" buttons to add. ie add a selection, add an effect (like figma)
- Scrolling should be considered an effect for insert, append, replace, delete, select
