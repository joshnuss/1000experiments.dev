---
title: Rollup with Laky bucket
experiment: 71
date: "2021-03-22"
permalink: rollup-with-leaky-bucket
tags: svelte
---

Continuing with the previous experiment [using debounce to rollup multiple messages](/posts/rollup-with-debounce), the problem with debounce is that the window is static. I want an abstraction that supports a dynamic period.

For example, the window could start at 1s, but when there are a ton of messages or when we know it's a high volume account, the window should increase proportionaly. So I need a different abstraction.

In this experiment, I change the code to use a "Leaky Bucket". It's basically a queue (array) that drains periodically.

I will look making the drain interval dynamic, based on the data rate.

## Code

https://svelte.dev/repl/40e7f8cebd9d4270859ac137218d9afd

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1616462659/1000experiments.dev/rollup-with-leaky-bucket_hfhdir.mp4"/>
