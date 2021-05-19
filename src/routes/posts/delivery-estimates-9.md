---
title: "Delivery estimates: alarms"
experiment: 87
date: "2021-03-28"
permalink: delivery-estimates-9
tags: delivery-estimates, e-commerce
---

When a package is an expedited parcel (ie overnight, 2-day, etc), the warehouse cannot miss the carrier pickup or it will result in an unhappy customer. It would be nice to raise an alarm via e-mail when the system detects a package is about to miss the pickup.

It turns out the [database schema I built](/posts/delivery-estimates) contains much of the data needed to make that work. It already knows the operating & holiday schedule for both the warehouse and the carrier.

## Finding unfulfilled orders

If an `orders` table is added to the mix:

```sql
create table orders (
  id serial primary key,
  account_id bigint references accounts not null,
  number varchar not null,
  source varchar not null,
  status varchar not null,
  payment_status varchar not null,
  fulfillment_status varchar not null,
  fulfill_by timestamp with time zone not null
);
```

The order data could be pulled from the cart system and then queried to find which orders are still unfulfilled:

```sql
select * from orders
  where fulfillment_status = 'unfulfilled' and fulfill_by < now()
```

## Computing the threshold

The tricky part is computing the `fulfill_by` timestamp.

It's a combination of:

- **Business date**: the business date of the order depends on the warehouse cutoff time. All orders past the cutoff moves to the next business date.
- **Operating schedule**: when an order is placed past the cutoff time, or on a date when the warehouse is closed, the date slides to next open calendar day.
- **Holiday schedule**: similar to operating schedule rules, the holiday schedule of the carrier and warehouse need to be verified.
- **Packing time**: the system need to factor in how long it takes to pack an item (as a global setting). eg, if the packing time is 1 hour, and the carrier pickup time is 3PM, then the alarm should sound at 2PM (1 hour before pickup)
