---
title: Bucket with calculus
experiment: 72
date: "2021-03-23"
permalink: bucket-with-calculus
tags: 
---

In the last experiment, I [looked at building a leaky bucket](/posts/rollup-with-leaky-bucket) that could group notifications into sets, to avoid bombarding end users with too many notifications.

The bucket window needs to scale from small to big. For example, someone that never gets notifications, should be notified immediately of a notification, while someone that gets tons of nofications should have them grouped. Another situation is when notifications are accelerating, maybe because of a spike, in that case we want an algo to scale up the window in realtime.

Thinking about it, maybe it's a calculus problem? ie the number of notifications is a series of a points over time, the speed is the rate of change since the last point, and the acceleration is the rate the speed has changed.

Then it's just a metter of mixing those 3 numbers together to product an appropriate window duration. Also, there will always a maximum window (ie 30 minutes), so it the window of data to compute speed and acceleration for is bounded.

So I set out to visualize the problem more, and ended up building an svg that displays the points over time. My calculus knowledge is super rusty, but this seemed to work.

P.S. if i use this in a real program, it will be the first time I ever used calculus as a software dev. It would make me pretty get some benifit from all the hard work I put in trying to learn it.

## Code

https://svelte.dev/repl/a056f448f60241bb96e36730029c3e74?version=3.35.0

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1616473836/1000experiments.dev/count-speed-accell_f9o77o.mp4"/>
