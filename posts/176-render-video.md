---
title: "Code animation: Rendering server"
experiment: 176
date: "2021-05-06"
permalink: render-video
tags: svelte, code-video
---

Back in [experiment #7](/posts/recording-code-to-video), I looked into rendering video with [playwright](https://playwright.dev/).

But that experiment used a local script.

What I'd prefer, is rendering the video on demand via an endpoint on the server, or maybe even in a lambda function.

## Code

This example comunicates with chromium during the request. It would be better to use a background job, since this could take time.

```javascript
import express from 'express'
import bodyParser from 'body-parser'
import {chromium} from 'playwright'
import path from 'path'
import fs from 'fs'

const app = express()

app.use(bodyParser.json())

app.post('/render', async (req, res) => {
  const file = await run(req.body)
  const absPath = path.resolve(file, "./")

  console.log(await fs.promises.readFile(absPath, 'utf-8'))

  res.sendFile(absPath)
})

app.listen(process.env.PORT || 3000)

const run = async ({viewport, dimensions, duration, url}) => {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport,
    recordVideo: {
      dir: 'videos/',
      size: dimensions
    }
  })
  const page = await context.newPage()

  await page.goto(url)
  await page.waitForTimeout(duration)
  await context.close()
  await browser.close()

  return await page.video().path()
}
```

And a request is made like this:

```bash
curl localhost:3000/render \
  --header 'content-type: application/json' \
  --data '{"viewport": {"width": 1920, "height": 1080}, "dimensions": {"width": 1920, "height": 1080}, "duration": 3000, "url": "https://google.com"}' \
  --output example.webm
```

That saves the video to `example.webm`

## Notes

- Use a background job.
- Synchronize the start time of the video. This has no control over how long chromium takes to start up, so the video size is variable. It will probably need to be cropped after this stage to remove the dead time at the beginning.
- Does this work in the cloud? what setup is needed to run chromium/playright in the cloud?
