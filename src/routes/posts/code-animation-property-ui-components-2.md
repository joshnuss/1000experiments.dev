---
title: "Code animation: Property UI components 2"
experiment: 134
date: "2021-04-15"
permalink: code-animation-property-ui-components-2
tags: svelte, code-video
---

[Continuing](/posts/code-animation-property-ui-components) to build out controls for the [property grid](/posts/property-ui-dsl).

This experiment will look at implementing 3 more controls:

## CheckboxField component

```html
<script>
  import Field from './Field.svelte'

  export let label
  export let name
  export let value
</script>

<Field orientation="horizontal" for={name}>
  <label>
    <input type="checkbox" {name} bind:checked={value}/>
    {label}
  </label>
</Field>
```

## ColorField component

This a great example of why data binding is so powerful. The control has two methods to input the color, via text input or by using the color picker. Both inputs are data bound to the same value, so everything updates regardless which input method you use. Very handy.

```html
<script>
  import Field from './Field.svelte'

  export let label = null
  export let name
  export let value
</script>

<Field {label} orientation="horizontal" for={name}>
  <input type="color" bind:value/>
  <input {name} bind:value/>
</Field>
```

## SelectField component

The `<SelectField>` component uses the excellent [`svelte-select`](https://github.com/rob-balfre/svelte-select) package.

```html
<script>
  import Select from 'svelte-select'
  import Field from './Field.svelte'

  export let orientation = 'vertical'
  export let label = null
  export let name
  export let value
  export let options = []
  export let placeholder = ''

  let selectedValue

  $: {
    value = selectedValue ? selectedValue.value : null
  }
</script>

<Field {label} {orientation} for={name}>
  <div class="theme">
    <Select items={options} bind:selectedValue={selectedValue} {placeholder} isSearchable containerClasses="select-container" />
  </div>
</Field>
```

## Code

https://svelte.dev/repl/c8921224dfab406a8e6195054dd8bb17?version=3.37.0
