---
title: IVR Server
experiment: 97
date: "2021-03-31"
permalink: ivr-server
tags: twilio, javscript
---

Decided to look into whether I could build an IVR system that could handle calls for me.

I started putting together an app with Twilio.

## Code

```javascript
require('dotenv/config')
const express = require('express')
const twilio = require('twilio')
const VoiceResponse = twilio.twiml.VoiceResponse
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded())

app.post('/start', (request, response) => {
  const twiml = new VoiceResponse()

  twiml.say({voice: 'alice'}, "Thank you for calling Josh!")
  twiml.say('If you are a telemarketer or selling a product, press 1. If you would like to schedule a call, press 2. If you have a scheduled call, or the matter is urgent, press 3.')

  // Render the response as XML in reply to the webhook request
  response.type('text/xml')
  response.send(twiml.toString())
})
```
