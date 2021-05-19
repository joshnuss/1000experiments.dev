---
title: Newsfeed as a service
experiment: 44
date: "2021-03-13"
permalink: newsfeed-as-a-service
tags: newsfeed, idea
---

SaaS projects often need a newsfeed (aka activity feed).
It's usually not the first thing people think to build, opting instead to just send emails for notifications. As the system grows, more and more activities need a companion notification.

As the number of notifications increase, sending individual transactional e-mails stops being a great solution, it's just too many emails. What works better is sending a recap style e-mail with multiple activities every few hours or so.

And when similar activities happen close together, ie "a user signed up" "a user signed up" "a user signed up", it's better to rollup those activities into a single notice "3 users signed up".

Coding all that up is a bit of a pain. Personally, I'd rather just send the events to a service, and let it collect the activity data, do the rollups, provide to news feed, and email users based on their preferences.

It would be cool if it could publish those notifications over a `WebSocket`. Then the client (mobile or desktop) could display the latest activities as they arrive. When the user views the notification, it can be marked as "read" so that the email doesn't get sent out.


## Publishing an activity

Post data to the `/activites` endpoint:

```bash
curl domain.tld/activities --data '{"user": 1, "entity": "order", action: "create", "metadata": ...}'
```

## Read activities

Activities can be queries by user ID:

```bash
curl domain.tld/activities/1?read=false&page=1
```

## Notification of a new activity

A client (mobile or desktop) can be notified of a new activity via a websocket:

```javascript
const ws = new WebSocket("ws://domain.tld/activities/<user_id>")

ws.addEventListener('message', event => {
  alert(`we got ${event.data.length} new activities`)
})
```

## Tracking reads

The websocket can be used to mark activities as read:

```javascript
ws.send(JSON.stringify({type: 'read', ids: [...]}))
```
