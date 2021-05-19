---
title: Scene components
experiment: 23
date: "2021-03-06"
permalink: scene-components
tags: animation, svelte
---

Last week, I found that embedding SVG inside SVG is a great way to animate things. The outer SVG is like the "storyboard", and the inner SVGs are the scenes. Transitioning scenes means panning the viewbox of the storyboard.

Each scene has it's own viewbox and it's own coordinate system. It's way easier that smashing everything into one single giant monolithic SVG.

Today I looked into whether a set of components could be made to make this setup even easier. Easpecially for scenes that are on a grid.

The rough idea:

```html
<Storyboard {viewBox} sceneDimesions={{width: size, height: size}}>
	<Scene position={{x: 0, y: 0}}>
		<rect x=0 y=0 width=20 height=20 fill=green/>
	</Scene>
	<Scene position={{x: 30, y: 0}}>
		<rect x=0 y=0 width=20 height=20 fill=orange/>
	</Scene>
	<Scene position={{x: 0, y: 30}}>
		<rect x=0 y=0 width=20 height=20 fill=purple/>
	</Scene>
	<Scene position={{x: 30, y: 30}}>
		<rect x=0 y=0 width=20 height=20 fill=pink/>
	</Scene>
</Storyboard>
```

Both `<Scene>` and `<Storyboard>` components are SVGs, but Scenes can be positioned individually. And you can still have elements that cross multiple scenes, by putting them inside the top level "storyboard" component.

## Here's the code:

https://svelte.dev/repl/44d7109a08114fc184ceae4c5ff4163a?version=3.35.0

## Here's what it looks like:

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1615076067/1000experiments.dev/scene-components_zdafkm.mp4"/>
