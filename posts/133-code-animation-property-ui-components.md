---
title: "Code animation: Property UI components - I"
experiment: 133
date: "2021-04-15"
permalink: code-animation-property-ui-components
tags: svelte, code-video
---

Yesterday I figured out what components I need to make the [property grid UI](/posts/property-ui-dsl) work. Today I started implementing the components.

I implemented some of them:

## Section component

```html
<script>
  export let title = null
</script>

<section>
  {#if title}<h4>{title}</h4>{/if}

  <slot/>
</section>
```

## Fieldset component

Supports vertical and horizontal orientation.

```html
<script>
  export let orientation = "vertical"
</script>

<div class="container" class:vertical={orientation == 'vertical'} class:horizontal={orientation == 'horizontal'}>
  <slot/>
</div>
```

## Field component

Supports vertical and horizontal orientation.

```html
<script>
  export let label = null
  let forControl = null
  export { forControl as for }
  export let orientation = "vertical"
</script>

<div class="field" class:vertical={orientation == 'vertical'} class:horizontal={orientation == 'horizontal'} >
  {#if label}<label for={forControl}>{label}</label>{/if}
  <slot/>
</div>
```

## TextField component

Supports numbers or text inputs at the moment. Reuses the `<Field>` component.

```html
<script>
  import Field from './Field.svelte'

  export let orientation = 'vertical'
  export let label = null
  export let name
  export let value
  export let type = "text"

  export let min = null
  export let max = null
</script>

<Field {label} {orientation} for={name}>
  {#if type == 'text'}
    <input {name} bind:value/>
  {:else if type == 'number'}
    <input {name} bind:value type="number" {min} {max}/>
  {/if}
</Field>
```

## Organizing it

When there are many components that are used together, it's nice to be able to import them in one line:

```javascript
import { Section, Fieldset, TextField } from '$/lib/components/properties'
```

So I like to define an index file to forward export all the components:

```javascript
// properties.js
export { default as Section } from './Section.svelte'
export { default as Fieldset } from './Fieldset.svelte'
export { default as Field } from './Field.svelte'
export { default as TextField } from './TextField.svelte'
```

## Code

https://svelte.dev/repl/69b0771e835e4ef78fa89405bad8a052?version=3.37.0

## Notes

- I really really like the approach of writing before working, it always results in clearer and more thought out code that usually works the first time and looks nice.
