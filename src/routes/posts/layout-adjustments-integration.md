---
title: "Code animation: Fixed layout integration"
experiment: 161
date: "2021-04-28"
permalink: layout-adjustments-integration
tags: svelte, code-video
---

In [experiment #155](/posts/layout-adjustments), I looked into making parts of the layout fixed. In this experiment, I will try to integrate it in 10 minutes

Update: It took 10 minutes. Also added a `fly` transition to the sidebar.

## Snapshot

https://gitpod.io#snapshot/d77aa26e-ac00-4a5f-8d21-7b4d4f4ac25d

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1619588559/1000experiments.dev/layout-resize-integration_gq97pb.mp4"/>

## Notes

- `fly` transition for sidebar, should only run the first time the sidebar opens, and not when a secton selection is made.
