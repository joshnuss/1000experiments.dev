---
title: Search with auto-complete
experiment: 204
date: "2021-07-09"
permalink: autocomplete-search
tags: carrierwave, svelte
---

Last August, I starting building a startup called [CarrierWave][https://getcarrierwave.com].

For about 3 months I was working on it full time. Then things slowed down a bit and I started looking into other things.

But recently there's been more interest in it, nothing major, but a few people wanted to try it. So I figured I should fix up a few things and maybe I can increase the MRR.

Right now MRR is at $200/mo, I'd like to try to get it up to $1K/mo.

So I decided to spend a few experiments looking at adding some new things to it.

## Search

One thing I wanted to add is a search input in the navbar with auto complete. I found a pretty nice Svelte component [simple-svelte-autocomplete](https://github.com/pstanoev/simple-svelte-autocomplete) which does everything I need. 

So I went thru and figured out how to make it work with tailwind, sync the results with a remote API. Below is the code.

## Code

https://svelte.dev/repl/f5e18d6641be4d7ab0324fedb2991c08?version=3.38.3

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1625817098/1000experiments.dev/auto-complete-search-box_hek7fu.mp4"/>

## Notes

-
