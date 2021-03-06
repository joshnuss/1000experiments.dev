---
title: Generate a weekly log
experiment: 22
date: "2021-03-06"
permalink: generate-weekly-log
tags: tools
---

At the end of every week, I want to send a list of the past's weeks experiments to my email list. It would be helpful to have some tools to make that job faster.

So I created a script `yarn log`, that outputs a markdown list that I can copy and paste into mailchimp.

It's pretty straightforward, but it will save me 10 minutes every week.

## Here's the code:

```javascript
const getPosts = require('./posts.js')

getPosts().forEach(post => {
  console.log(
    `[#${post.data.experiment} - ${post.data.title}](https://1000experiments.dev/posts/${post.data.permalink})`
  )
})
```
