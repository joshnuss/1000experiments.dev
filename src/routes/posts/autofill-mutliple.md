---
title: "Claim AutoFill: Filing multiple claims at once"
experiment: 216
date: "2021-07-18"
permalink: autofill-mutliple
tags: carrierwave, svelte
---

In the [last experiment](/posts/autofill-single-claim), I added the ability to submit a single claim.

This experiment expands it to submit multiple at once.

## Code

It was prettry straight forward, just looping thru all pending shipments and submitting it.

Since I need to the list of pending shipments in a few places, and it's computed based of `shipments`,  I used a reactive statement keep the logic in one place:

```javascript
$: pendingShipments = shipments
    .filter(shipment => shipment.status == 'pending')
```

Then my looping logic was very straightforward:

```javascript
async function submitAll() {
  for (const shipment of pendingShipments) {
    await submit(shipment, {submit: true})
  }
}
```

Came together pretty nicely. Pretty good result for just 6 experiments.

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1626609652/1000experiments.dev/claim-autofill_kdbs1z.mp4"/>

## Notes

-
