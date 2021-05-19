---
title: "Code animation: Settings editor"
experiment: 150
date: "2021-04-22"
permalink: settings-editor
tags: code-video, svelte
---

This integrates the previous experiment where I researched creating a [DSL for defining property editor components](/posts/property-ui-dsl).

## SettingsEditor component

The `<SettingsEditor>` component is responsible for configuring defaults and global css rules.

```html
<Section title="Defaults">
  <NumberField label="Duration (ms)" bind:value={$document.defaults.duration} min=0/>
  <SelectField label="Easing" bind:value={$document.defaults.easing} options={easingFunctions}/>
</Section>

<Section title="Style">
  <CodeField label="CSS" language="css" bind:value={$document.settings.styles}/>
</Section>
```

## Snapshot

https://gitpod.io#snapshot/0784c850-1017-491c-bd36-05a899b8fb29

## Demo

<video src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1619081823/1000experiments.dev/settings-editor-component_fxgmqx.mp4" controls/>

## Notes

- When `document.css` changes, it should automatically be reflected in the DOM by writing/updating a `<style>` tag.
