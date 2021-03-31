---
title: Android app with Svelte
experiment: 96
date: "2021-03-31"
permalink: android-app
tags: svelte, android
---

Another telemarketer called me today.

It seems like 90% of phone calls these days are telemarketers or robo calls. Normal humans don't "hop on a call" anymore, they are either scheduled or they start out as a chat in slack, discord whatsapp or telegram and escalate to audio.

It got me thinking about the problems of inbound calls. It's a similar problem to what Basecamp solved with hey.com and email. All communication should be controlled by the receiver. There should always be an invite and approval process before inbound calls are allowed.

This is how all modern messaging systems work, but unfourtunatly it's a mistake that legacy telephone and sms protocol made. So how can I change that?

## Stopping

One solution is with an app that picks up incoming calls and screens them into buckets using audio questions.

There are 3 types of calls:

### Unsolicited calls

These are spam calls from robots and telemarketers.

> If you are a telemarketer or selling a product, please press 1 to enter you contact info.

After they enter their contact info:

> Thanks, if I'm interested I'll call you back, in the meantime please remove me from your list.

And of course, all responses submitted go directly into the trash.

### Unscheduled calls

These are calls from people that should book an appoitment before calling.

> To schedule a call, please press #2

Then they would get a schedule link (savvycal, calendly) via sms

### Scheduled or urgent calls

These are the only valid calls that should ring.

> If you have a scheduled appointment or the call is urgent, press 3


## Implentation

There are 2 ways I could think of

1. Setup a VOIP server to do the call forwarding
2. Create an android app that picks up the call

The downside of #1 is I'd need to move my mobile phone number to the voip trunk.
The downside of #2 is it's difficult to build, based on research I did today, it should be possible to answer a call from an app, but piping in audio from the app and handling button presses and recording could be a challenge.

There is also a potential hybrid approach, where an app picks up all calls and forwards them to remote voip server. The voip server does the screening and then plays a tone which the app detects to allow the call to pass.
