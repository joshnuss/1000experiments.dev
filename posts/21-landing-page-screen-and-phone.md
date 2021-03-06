---
title: Landing page screen and phone components
experiment: 21
date: "2021-03-06"
permalink: landing-page-screen-and-phone
tags: marketing, landing-page, svelte
---

Since I will often test landing pages for developer related things, I figured it would handy to have a screenshot of a phone and desktop screen to display how things work. Likely using animations.

So I added 2 components, called `Phone` and `Screen`. They both use slots to wrap the inner content.

```html
<Screen title="screen title here">
  <!-- any content here -->
</Screen>

<Phone title="phone title here">
  <!-- any content here -->
</Phone>
```

**Here's the code:**

https://github.com/joshnuss/landing-page-template/compare/7ecd31fb69ea09e14ab7f0c07efa334047452991...bd2e1f298a94fcbab7c1c9ba1539ed552382696a

**Here's what it looks like:**

<img alt="animation" src="https://res.cloudinary.com/dzwnkx0mk/image/upload/v1615021268/1000experiments.dev/landing-page-screen-and-phone-component_a9nlfb.png"/>
