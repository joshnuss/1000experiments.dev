---
title: IVR - recording
experiment: 99
date: "2021-04-01"
permalink: ivr-recording
tags: twilio, javascript
---

Updated the IVR project to provide a fake voice mail honeypot for robo calls.
It was a just a matter of playing a "beep" sound using an mp3 file.

## Code

```javascript
twiml.say("At the tone, please ree-chord your message.")
twiml.pause({length: 1})
twiml.play({}, 'http://domain.tld/tone.mp3')
twiml.pause({length: 6})
twiml.play({}, 'http://domain.tld/tone.mp3')
twiml.say('Thank you. Now, please remove me from your list. Goodbye.')
twiml.hangup()
```
