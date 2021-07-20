---
title: Readable date ranges
experiment: 217
date: "2021-07-20"
permalink: readable-date-ranges
tags: svelte
---

I want to create a date range picker component for the [charts I was building](/posts/carrierwave-charts-plan), but I want it to be able to display the range as human readable text when possible.

It should display text like:

- `today`
- `yesterday`
- `last n days`
- `last n weeks`
- `Jan 1st - Jan 5th`

So I built a function that takes two dates, `from` and `to`, and formats them accordingly.

## Code

https://svelte.dev/repl/5133e2afce94407f84bdde0d59e23301?version=3.38.3

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1626765863/1000experiments.dev/readable-date-ranges_gl22ir.mp4"/>

## Notes

-
