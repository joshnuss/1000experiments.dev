---
title: "Code animation: Watermark"
experiment: 170
date: "2021-05-03"
permalink: watermark
tags: code-video, svelte
---

For the [code animation project](/tag/code-video), I'd like to show a watermark on the video. This will enable to have a free plan, or for pro plans they can setup their own watermark, or disable it.

## Code

It's just a simple overlay with absolute positioning, and the data comes from the `document` store:

```html
<!-- Frame.svelte -->
<div class="wrapper">
  {#if $document.watermark}
    <div class="watermark">{$document.watermark}</div>
  {/if}
</div>

<style>
  .wrapper {
    position: relative;
  }
  .watermark {
    position: absolute;
    bottom: 25px;
    color: #777;
    font-weight: bold;
  }
</style>
```

## Snapshot

https://gitpod.io#snapshot/badb4390-5438-4c2e-81f1-baa5e14c8f34

## Demo

<img alt="animation" src="https://res.cloudinary.com/dzwnkx0mk/image/upload/v1620020643/1000experiments.dev/watermark_g5gzdm.png"/>
