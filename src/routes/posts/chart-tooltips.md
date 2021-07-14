---
title: Chart tooltips
experiment: 208
date: "2021-07-14"
permalink: chart-tooltips
tags: svg, svelte, carrierwave
---

Continuing on the [charts for CarrierWave](/posts/carrierwave-charts-plan), in the [last experiment](/posts/tooltip-action-svg) I figured out how to make tooltips that are based on another HTML element.

In this experiment, I bind the tooltip to an element that shows the breakdown of the element:

## Code

Can't share the complete REPL as it uses [tailwind-ui](https://tailwindui.com/) (a paid product).

```html
<!-- BarChart.svelte -->
<script>
	import Bar from './Bar.svelte'

	export let data
	export let points

	$: max = Math.max(...data.map(date => Object.values(date.counts).reduce((acc, n) => acc + n, 0)))

	const barWidth = 10
</script>

<div class="flex">

	<svg viewBox="0 0 {points*barWidth} {max}" class="my-6" height="200" preserveAspectRatio="xMidYMid meet">
		{#each data as day, index}
			<Bar {day} {index} {barWidth} {max}/>
		{/each}
	</svg>
</div>
```

```html
<!-- Bar.svelte -->
<script>
	import { format } from 'date-fns'
	import tooltip from './tooltip'
  import BarSection from './BarSection.svelte'

	export let day
	export let barWidth
	export let index
	export let max

	const colors = {
		shipped: '#5494ca',
		delivered: '#54ca54',
		damaged: '#ff5454',
		returned: '#ffca68',
		stuck: '#f9fcc7'
	}

	let tooltipElement
</script>

<div bind:this={tooltipElement}>
	<h3 class="text-lg font-bold">{format(day.date, "LLL do")}</h3>
	<dl class="grid grid-cols-2 my-2">
		{#each Object.entries(day.counts) as [status, count]}
			<dd>{status}</dd>
			<dt class="text-right">{count.toLocaleString()}</dt>
		{/each}
	</dl>
</div>

<g use:tooltip={{content: tooltipElement, placement: 'left'}} style="transform: translateY({max-(day.counts.delivered+day.counts.shipped+day.counts.damaged+day.counts.stuck+day.counts.returned)}px)">
  <BarSection x={index*barWidth} y=0 width={barWidth-2} height={day.counts.delivered} fill={colors.delivered}/>
  <BarSection x={index*barWidth} y={day.counts.delivered} width={barWidth-2} height={day.counts.shipped} fill={colors.shipped}/>
  <BarSection x={index*barWidth} y={day.counts.delivered+day.counts.shipped} width={barWidth-2} height={day.counts.damaged} fill={colors.damaged}/>
  <BarSection x={index*barWidth} y={day.counts.delivered+day.counts.shipped+day.counts.damaged} width={barWidth-2} height={day.counts.stuck} fill={colors.returned}/>
  <BarSection x={index*barWidth} y={day.counts.delivered+day.counts.shipped+day.counts.damaged+day.counts.stuck} width={barWidth-2} height={day.counts.returned} fill={colors.stuck}/>
</g>
```

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1626241318/1000experiments.dev/chart-tooltips_p1bayc.mp4"/>

## Notes

-
