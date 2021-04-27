---
title: "Code animation: Codemirror data-biding fix"
experiment: 159
date: "2021-04-27"
permalink: codemirror-data-binding-fix
tags: code-video, svelte
---

One way to turn a chore into an experiment is to make the experiment about how much time it takes. Like, can I finish this in 10 minutes?

There 2 dimensions, the work and the time the work takes, both can be experimented with.

So in this experiment, I will integrate [a fix I made in #153](/post/codemirror-databinding).

## Integration

1. Make fix locally
2. Test it on a local repo using `yarn link`
3. Commit change, and bump npm version
4. Bump version in gitpod code sandbox and verify
5. Record video

Target time: 10 minutes.

Update: It took an hour :( had to figure out why dependecies weren't updating.

## Snapshot

https://gitpod.io#snapshot/d159eb3d-f1eb-4acf-aeaa-a2e5cd44bd96

## Demo

<video src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1619545131/1000experiments.dev/codemirror-databinding-fix_sd0cv0.mp4" controls/>

## Notes

- Bug: Changes to `<CodeMirror/>`'s `language` and `lineNumbers` option doesn't take effect immediately.
