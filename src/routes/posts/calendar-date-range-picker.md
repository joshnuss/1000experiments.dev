---
title: Calendar date range picker
experiment: 218
date: "2021-07-20"
permalink: calendar-date-range-picker
tags: svelte
---

After my [last experiment with readable date ranges](/posts/readable-date-ranges), I set out to create a calendar view for selecting date ranges.

I based it off what AirBnB does for choosing dates. It also makes use of the excellent [`date-fns`](https://date-fns.org/) package which made the date math a lot less painful.

## Month component

Once you know the first day of the month, you can interate through all the days in the month display it with a CSS grid:


```html
<script>
  import { createEventDispatcher } from 'svelte'
	import { getDay, getDaysInMonth, add } from 'date-fns'

  export let year, month

  const dispatch = createEventDispatcher()

  let dates = []

  // reactive statements, in case `year` or `month` change
  $: firstOfMonth = new Date(year, month, 1)

	$: {
		dates =  []

		for (let i=0;i<getDaysInMonth(firstOfMonth); i++) {
      const date = add(firstOfMonth, {days: i})
			dates.push(date)
		}
	}

  function select(date) {
    dispatch('select', date)
  }
</script>
<div class="month">
  <div class="heading">Sunday</div>
  <div class="heading">Monday</div>
  <div class="heading">Tuesday</div>
  <div class="heading">Wednesday</div>
  <div class="heading">Thursday</div>
  <div class="heading">Friday</div>
  <div class="heading">Saturday</div>

  <!-- create empty tiles for dates from previous months -->
  <!-- if we find the day of week for the first of month, that's the same number of empty cells we need to create -->
  <!-- ie, if the first is a wednesday, DOW=3 (zero based), so we create 3 empty cells -->
  {#each Array(getDay(firstOfMonth)) as _}
    <div class="empty"/>
  {/each}

  <!-- output a button for each day in the month -->
  {#each dates as date, n}
    <button on:click={() => select(date)}>{n}</button>
  {/each}
</div>

<style>
  .month {
    display: grid;

    /* 7 fractional units */
    grid-template-columns: repeat(7, 1fr)
  }
</style>
```

When the user clicks a cell, it figures out how to update the selection:

- **First selection**: set `selection` to a single day. that means setting `start` and `end` to the same date.
- **Second selection**: if the selection is prior the `start`, the selection is extended left, if it's after the `end`, it's extended right.
- **Toggling**: clicking on an already selected date (start or end), clears the selection back to a single-date selection.

## Code

https://svelte.dev/repl/8de01014756c4e219c3da1521ef3304a?version=3.38.3

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1626772375/1000experiments.dev/calendar-date-range-selection_xvmzps.mp4"/>

## Notes

- Most of this should be in a dropdown. The dropdown should show the humanized text of the date range (ie "Past 30 days"), and the drop down would show two months at a time. With arrows to move left or right
- Selecting in the future should have an option to be disabled, because it's not needed for reports.
