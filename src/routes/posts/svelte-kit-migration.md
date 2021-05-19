---
title: Migrating to svelte-kit
experiment: 192
date: "2021-05-19"
permalink: svelte-kit-migration
tags: svelte
---

Migrated this project from sapper to [svelte-kit](https://kit.svelte.dev).

In the process, I switched to [mdsvex](https://mdsvex.com).

## Bumped into a weird error

One of my posts was titled "google-ads", when the file "google-ads.md" was downloaded, the ad-blocker chrome extension blocked it and caused all page loads to fail. I ended up fixing it, by renaming the file to "google-a-d-s", but that took a couple hours to figure out.

## Another problem I ran into

One tutorial recommended adding `package.json` to `.vercelignore`... bad idea. Vercel failed to build and kept giving me an error "missing package.json in /vercel/path0/package.json". That took some time to figure out. But simply deleting `.vercelignore` solved it.

## Going forward

It's all done now! and I'm loving it. Now I have a good base for updating the design in the coming weeks.

## Code

[View pull request](https://github.com/joshnuss/1000experiments.dev/pull/7)

## Demo

<img alt="animation" src=""/>

## Notes

- Remove `markdown`, `frontmatter` npm packages. Use whatever `mdsvex` uses or `import.meta.globEager()`
