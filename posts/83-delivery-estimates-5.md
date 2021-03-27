---
title: "Delivery estimates: faster algorithm"
experiment: 83
date: "2021-03-27"
permalink: delivery-estimates-5
tags: delivery-estimates, supabase, e-commerce
---

In the [last experiment](/posts/delivery-estimates-4), I estimated the delivery by sampling 2 points in each state, the closest zip code and the farthest zip code.

There is a problem with thata approach though.

Using the zip codes produced by the experiment, I looked it up on maps, and often the closest zip code is in a rural area. Though the point is physically closer, I doubt it's serviced as quickly as a major city that may be farther away, but has an airport and is closer to postal facilities and more delivery trucks.

So I thought about sampling more points in each state, maybe based on population.

But I think there is an even better algorithm.

If you think about what the carrier does to execute a delivery, there are 3 phases to it:

- **Ingestion**: picking up a package from a customer warehouse and scanning it into the network.
- **Routing**: moving the packages between facilities, via multiple modes of transport.
- **Delivery**: dispatching the package from the local facility to the destination address.

The "Routing" phase is kind of hidden. But the others arent, and we could measure the ingestion speed and delivery speed for each zip code by making API requests to the carriers's shipping rate API.

**To measure ingestion**: for each zip code, check the delivery speed against a constant destination zip code. Determine the average and assign a +/- rating to each zip code
**To measure delivery**: same approach, just flipped around. for each zip code, measure how long it would take a package to arrive if the origin was a constant zip code. Assign a +/- rating.

Since there are 33,000 zip codes, those 2 queries would take 2x33,000 = 66,000 API requests per carrier. But the good thing is, those queries are bounded. We only need do them once (and periodically update them every 6 months). That means adding a new warehouse won't require any API requests, we just look a the +/- ingestion rating for the warehouse's zip code.

When a delivery estimate request is made, the system determines the warehouse that will be used, it's +/- ingestion rating of that origin and the +/- delivery rating of the destination zip, and voila, you should have a solid estimate.
