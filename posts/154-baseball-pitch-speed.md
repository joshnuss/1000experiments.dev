---
title: Baseball pitch speed
experiment: 154
date: "2021-04-25"
permalink: baseball-pitch-speed
tags: svelte
---

This one is a totally random one.

I was imagining an AR/VR simulator for training baseball players by pitching faster balls than they would see in real life.

Currently, the fastest fastest pitcher in basball is [Aroldis Chapman](https://en.wikipedia.org/wiki/Aroldis_Chapman) who can pitch at 105mph. But with a simulator there's no limit on pitch speed, it could send pitches at 200mph, which would make 105mph feel like little league.

There probably is a limit to human reaction speed, I've read it is 250ms. A baseball at 100mph arrives in 400ms, leaving only 150ms for decision. But maybe a simulator can strengthen the decisioning in that time.

This experiment is a naive implementation of the physics of pitching in 2D.

## Code

https://svelte.dev/repl/3a8a72f7f9e94f809aaa612ef600a7e0?version=3.37.0

## Demo

<video src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1619337625/1000experiments.dev/baseball-speed_qjcm5f.mp4" controls/>

## Notes

- This does not account for release point. A pitcher with longer arms has a release point that is closer to the plate. ie pitch-distance = distance-between-plate-and-mound - release.
- Does not account for easing or movement. Pitch is unlikely linear, the friction in air is slowing it down, and the spin will cause movement.
