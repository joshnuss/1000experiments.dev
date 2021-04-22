---
title: "Code animation: Screen editor component"
experiment: 149
date: "2021-04-22"
permalink: screen-editor-intergration
tags: code-video, svelte
---

This integrates the previous experiment where I researched creating a [DSL for defining property editor components](/posts/property-ui-dsl).

## ScreenEditor Component

The `<ScreenEditor>` component is responsible for modify screen related data.

The component looks something like this:

```html
<script>
  import { document } from '$lib/document'
  import { Section, TextField, ColorField, CheckboxField, SelectField, CodeField, PositionField, Fieldset } from '$lib/components/properties'

  const presets = []
  const languages = []
</script>

<Section title="Title">
  <TextField bind:value={$document.window.title}/>
</Section>

<Section title="Dimension">
  <Fieldset orientation="horizontal">
    <TextField type="number" label="H" orientation="horizontal" bind:value={$document.window.height} min=0/>
    <TextField type="number" label="W" orientation="horizontal" bind:value={$document.window.width} min=0/>
  </Fieldset>
</Section>

<Section title="Style">
  <SelectField label="Preset" bind:value={$document.window.preset} options={presets}/>
  <ColorField label="Color" bind:value={$document.window.color}/>
  <ColorField label="Background" bind:value={$document.window.background}/>

  <Fieldset orientation="horizontal">
    <TextField type="number" label="Border" bind:value={$document.window.border.size} min=0/>
    <ColorField bind:value={$document.window.border.color}/>
  </Fieldset>
</Section>

<Section title="Options">
  <CheckboxField label="Controls" bind:value={$document.window.controls}/>
</Section>

<Section title="Code Editor">
  <SelectField label="Language" bind:value={$document.window.language} options={languages}/>
  <CheckboxField label="Line Numbers" bind:value={$document.window.lineNumbers}/>
  <CodeField label="Initial" language={$document.window.language} lineNumbers={$document.window.lineNumbers} bind:code={$document.window.initial}/>
</Section>
```

## Snapshot

https://gitpod.io#snapshot/ff5bd0aa-e90c-4496-b7d0-a894a88afea2

## Demo

<video src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1619077673/1000experiments.dev/screen-editor-component_ew14ho.mp4" controls/>

## Notes

- It only supports a code editor screen for now, I may expand it later to support multiple screen types. ie editor, browser, phone
- Bug: Fix layout for property fields when there are multiple fields per fieldset
- Bug: Databading between CodeField and CodeMirror not working
- Bug: JSON editor height doesn't scale properly
- Bug: Header disapears when timeline is too tall. I don't think the outer layout should use flexbox. The `<header>`, `<Timeline>` and sidebar should probably be `position: fixed`
