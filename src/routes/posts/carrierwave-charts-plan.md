---
title: Charts and analytics
experiment: 206
date: "2021-07-13"
permalink: carrierwave-charts-plan
tags: carrierwave, design
---

For my [startup](https://getcarrierwave.com), I want to add some charts and anlytics to the dashboard. This will help people see what's going on with a quick glance, and the click to expand information.

## Key metrics

Before I go and build the thing, probably a good idea to plan out what metrics are needed.
Note: it's based on time period (today, last week, etc...)

- New packages: `select count(id) from shipments where created_at between ? and ?`
- Delivery rate: `delivered_delivered / (total_delivered + total_returned)`
- Problem shipments: `stuck shipments + damaged shipments + shipments returned to sender`

## Charts

Carts are broken down by carrier in bar chart format:

- Activity: a bar chart by day. each bar is split by new, delivered, returned, stuck, and grouped by carrier (hide in transit events, theres too many).
- Delivery speed: show to time it takes for each parcel class

## Demo

Can't share the Svelte REPL for this because it contains tailwind-ui.

<img alt="animation" src="https://res.cloudinary.com/dzwnkx0mk/image/upload/v1626164409/1000experiments.dev/Screenshot_from_2021-07-13_04-19-32_kzmcwo.png"/>

## Notes

- To compute the time each parcel class takes, it will require storing some more data:
  - business days vs calendar days each package took
  - parcel class info (UPS 2-day, USPS First-class mail etc..)
- Add a date range picker component
- Build out a backend
