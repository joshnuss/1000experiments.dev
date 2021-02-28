---
title: Animating Input Selections
experiment: 2
summary: Recording text selections and playing them back
date: "2021-02-27"
permalink: recording-and-animating-input-selections
---

A while back, I made a [GIF of refactoring React code to Svelte](https://twitter.com/joshnuss/status/1208520843132841984).
Lots of folks asked me how I did it.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Refactoring some <a href="https://twitter.com/hashtag/reactjs?src=hash&amp;ref_src=twsrc%5Etfw">#reactjs</a> code to <a href="https://twitter.com/hashtag/sveltejs?src=hash&amp;ref_src=twsrc%5Etfw">#sveltejs</a> <a href="https://t.co/Z3qEIP4r5O">pic.twitter.com/Z3qEIP4r5O</a></p>&mdash; Josh Nussbaum (@joshnuss) <a href="https://twitter.com/joshnuss/status/1208520843132841984?ref_src=twsrc%5Etfw">December 21, 2019</a></blockquote>

It was done by hand coding a Svelte component ([code](https://svelte.dev/repl/e6c3f24c6cc64e8c9ca8cc9405778df2?version=3.34.0)) that walks thru a list of CSS classes. Each class, either highlights, hides or displays lines.

I also did a typewriter example: https://svelte.dev/repl/543a55ffb5184821971fa243c95e4e03?version=3.34.0 which looks like this:
![Terminal typewriter](/images/terminal-typewriter.gif)

Code is usually a screenshot, but as a GIF I think it's even more compelling. It's a really nice way to share a code on social media, for a presentation or for a video course.
I wondered if it was possible to make these more soft coded, that way it could work for any code. Maybe it could even end up as a VS code extension that records edits and generates a beautiful GIF/video.

So today I'm experimenting with recording the current selection, making a list of selections, and then playing it back.

Here's the code:
https://svelte.dev/repl/b2c83ff88a6d43a6b7f4cf882c0a8080?version=3.34.0

![example](/images/record-selection-animation.gif)

This one worked out well, I located selections using `element.selectionStart` & `element.selectionEnd`, stored them in an array and then played them back using `element.setSelectionRange()`.

To go further, I would explore recording deletions and additions too.
