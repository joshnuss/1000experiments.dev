---
title: "Code animation: Property UI components 3"
experiment: 136
date: "2021-04-16"
permalink: code-animation-property-ui-components-3
tags: svelte, code-video
---

[Continuing](/posts/code-animation-property-ui-components) to build out controls for the [property grid](/posts/property-ui-dsl).

This experiment will look at implementing the `CodeField` control:

## CodeField component

This one is a little bit tricky as it involved using [`codemirror`](https://codemirror.net/) which can only render in the browser.

I reused the [`svelte-codemirror`](https://github.com/joshnuss/svelte-codemirror) project I created a few weeks back. To make it run in-browser only, the components are imported dynamically - only when `window` is defined:

```javascript
// null on server side
let component

onMount(async () => {
  // don't run server-side
  if (!window) return

  // load codemirror stuff dynamically
  //
  // ./codemirror.js contains svelte-codemirror
  // and related dependencies, like syntax highlighting modules
  const { CodeMirror} = await import('./codemirror')

  component = CodeMirror
})
```

### Code listing

```html
<script>
	import Field from './Field.svelte'
	import { onMount } from 'svelte'
	
	export let orientation = 'vertical'
	export let label = null
	export let name
	export let value
	export let lineNumbers = false
	export let language = "htmlmixed"

	const options = {
		lineNumbers,
		mode: language,
		value
	}

	let component, editor

	$: if (editor) {
		editor.on('change', function (cm) {
			value = cm.getValue()
		})			
	}

	onMount(async () => {
		const { CodeMirror } = await import('./codemirror')

		component = CodeMirror
	})
</script>

<Field {label} {orientation} for={name}>
	<div class="container">
		{#if component}
			<svelte:component this={component} bind:editor {options}/>
		{/if}
	</div>
</Field>
```

## Notes

- The syntax highlighting file must be loaded first. Even thought there is a `language` prop, it can't dynamically load it ATM.
