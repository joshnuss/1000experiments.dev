---
title: "Code animation: Property UI DSL"
experiment: 130
date: "2021-04-14"
permalink: property-ui-dsl
tags: code-video, svelte
---

In this experiment I want to come up with a set of reusable components to help me build the [property UI](/posts/editor-ui-with-property-editor) quickly.
Hopefully by writing down what I want the code to look like, it will make it easier to hit the target on the first try. 

## Frame Editor

The frame editor would be responsible for editing the `<Frame/>`:

```html
<FrameEditor {frame}/>
```

And it should be defined as:

```html
<Section title="Dimension">
  <Fieldset orientation="horizontal">
    <NumberField label="H" bind:value={frame.height} min=0/>
    <NumberField label="W" bind:value={frame.width} min=0/>
  </Fieldset>
</Section>

<Section title="Color">
  <ColorField bind:value={frame.background}/>
</Section>
```

## Window Editor

The window editor would be responsible for editing all types of windows, like `<CodeEditor>`, `<Terminal>` `<Phone>`, and `<Browser>`.

```html
<Section title="Title">
  <TextField bind:value={window.title}/>
</Section>

<Section title="Dimension">
  <Fieldset orientation="horizontal">
    <NumberField label="H" bind:value={window.height} min=0/>
    <NumberField label="W" bind:value={window.width} min=0/>
  </Fieldset>
</Section>

<Section title="Style">
  <SelectField label="Preset" bind:value={window.preset} options={presets}/>
  <ColorField label="Color" bind:value={window.background}/>

  <Fieldset orientation="horizontal">
    <NumberField label="Border" bind:value={window.borderSize} min=0/>
    <ColorField bind:value={window.borderColor}/>
  </Fieldset>
</Section>

<Section title="Options">
  <CheckboxField label="Controls" bind:value={window.controls}/>
</Section>

<!-- dynamically display window specific settings -->
<svelte:component this={components[window.type]} bind:window/>
```

And there would be components for each window type

### Code Editor

```html
<Section title="Code Editor">
  <SelectField label="Language" bind:value={window.language} options={languages}/>
  <CheckboxField label="Line Numbers" bind:value={window.lineNumbers}/>
  <TextField label="Initial" bind:value={window.initial}/>
</Section>
```

### Terminal

```html
<Section title="Terminal">
  <TextField label="Prompt" bind:value={window.prompt}/>
  <TextField label="Initial" bind:value={window.initial}/>
</Section>
```

### Browser

```html
<Section title="Code Editor">
  <TextField label="Address" bind:value={window.address}/>
  <TextField label="Initial" bind:value={window.initial}/>
</Section>
```

## Settings Editor

The settings editor handle global settings:

```html
<Section title="Defaults">
  <NumberField label="Duration (ms)" bind:value={window.defaults.duration} min=0/>
  <SelectField label="Easing" bind:value={window.defaults.easing} options={easingFunctions}/>
</Section>

<Section title="Style">
  <CodeField label="CSS" language="css" bind:value={window.styles}/>
</Section>
```

## Events

All events share some settings:

```html
<Section title="Label">
  <TextField bind:value={event.label}/>
</Section>

<Section title="Caption">
  <TextField bind:value={event.caption}/>
</Section>

<Section title="Effect">
  <NumberField label="Duration (ms)" bind:value={event.duration} min=0/>
  <SelectField label="Easing" bind:value={event.easing} options={easingFunctions}/>
</Section>

<svelte:component this={components[event.type]} bind:event/>
```

### Append

Append always happens at the end, so there's no position specified. It's basically an `insert` at the end of the text.

```html
<Section title="Code">
  <CodeField language={event.language} bind:value={event.text}/>
</Section>

<Section title="Options">
  <CheckboxField label="Typewriter Effect" bind:value={event.typewriter}/>
  <CheckboxField label="Highlight" bind:value={event.highlight}/>
</Section>
```

### Insert

```html
<Section title="Position">
  <PositionField bind:value={event.position}/>
</Section>

<Section title="Code">
  <CodeField language={event.language} bind:value={event.text}/>
</Section>

<Section title="Options">
  <CheckboxField label="Typewriter Effect" bind:value={event.typewriter}/>
  <CheckboxField label="Highlight" bind:value={event.highlight}/>
</Section>
```

### Replace

```html
<Section title="Selection">
  <Fieldset orientation="horizontal">
    <PositionField label="Start" bind:value={event.selection.start}>
    <PositionField label="End" bind:value={event.selection.end}>
    <CheckboxField label="Scroll" bind:value={event.selection.scroll}>
  </Fieldset>
  <TextField label="CSS classes" bind:value={event.selection.classes}>
  <CodeField label="CSS styles" language="css" bind:value={event.selection.styles}>
</Section>

<Section title="Replacement">
  <CodeField language={event.language} bind:value={event.text}/>
</Section>

<Section title="Options">
  <CheckboxField label="Typewriter Effect" bind:value={event.typewriter}/>
  <CheckboxField label="Highlight" bind:value={event.highlight}/>
</Section>
```

### Delete

A delete happens starting at a secific position, which can be defined as a character index, line+character or just line, which puts the cursor at the end of the line

```html
<Section title="Position">
  <PositionField bind:value={event.position}/>
</Section>

<Section title="Length">
  <NumberField bind:value={event.length}/>
</Section>

<Section title="Effects">
  <CheckboxField label="Typewriter" bind:value={event.typewriter}/>
  <CheckboxField label="Highlight" bind:value={event.highlight}/>
</Section>
```

### Select

```html
{#each event.selections as selection}
  <Section title="Selection">
    <Fieldset orientation="horizontal">
      <PositionField label="Start" bind:value={selection.start}>
      <PositionField label="End" bind:value={selection.end}>
      <CheckboxField label="Scroll" bind:value={selection.scroll}>
    </Fieldset>
    <TextField label="CSS classes" bind:value={selection.classes}>
    <CodeField label="CSS styles" language="css" bind:value={selection.styles}>
  </Section>
{/each}

<button on:click={add}>Add</button>
```

### Scroll

Setting scrolling in the Y direction can be defined as either pixels or lines.

```html
<Section title="Position">
  <Fieldset orientation="horizontal">
    <SelectField bind:value={event.scroll.style} options={scrollOptions}/>

    {#if event.scroll.type == "pixels"}
      <NumberField label="Y" bind:value={event.scroll.y} min=0/>
    {:else}
      <NumberField label="Line" bind:value={event.scroll.line} min=0/>
    {/if}
  </Fieldset>
</Section>
```

## Components

Based on this discovery, the following components are needed:

`<Section>`, `<Fieldset>`, `<SelectField>`, `<NumberField>`, `<TextField>`, `<CheckboxField>`, `<CodeField>`, `<PositionField>`, `<ColorField>` and maybe `<SelectionSection>` too.

## Notes

- For a code editor window the initial value is set to source code, but what is the initial value set to for other types of windows? ie Browser, Phone, Terminal
