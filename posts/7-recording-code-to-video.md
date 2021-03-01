---
title: Recording code session to video
experiment: 7
date: "2021-03-01"
permalink: recording-code-to-video
tags: animation, svelte
---

As I make some progress on the code animation stuff (See [last experiment](/posts/codemirror-add-remove-highlighting)) thought it would be good to figure out how to generate a video.

The good news is video recording is often used for testing websites, so I can use the same tools here.

Did some research and found [playwright](https://playwright.dev/) from Microsoft. It looks really good.

Installed it:

```bash
yarn add playwright
```

And then put together a small script. I was even able to get 4K output!

Here's the code:

```javascript
// generate.js
const { chromium } = require('playwright')

const run = async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: {
      width: 1920, height: 1080
    },
    recordVideo: {
      dir: '.',
      size: { width: 1920, height: 1080 }
    }
  })
  const page = await context.newPage()

  await page.goto('http://localhost:8080')
  await page.click('button.play')

  setTimeout(async () => {
    await browser.close()
  }, 5000)
}

run()
```

And then I can run it with:

```bash
node generate.js
vlc <video-path>
```

To turn the video into a GIF, it can be done with `ffmpeg`:

https://superuser.com/questions/556029/how-do-i-convert-a-video-to-gif-using-ffmpeg-with-reasonable-quality
