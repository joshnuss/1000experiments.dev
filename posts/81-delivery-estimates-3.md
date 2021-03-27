---
title: "Delivery estimates: scheduling"
experiment: 81
date: "2021-03-26"
permalink: delivery-estimates-3
tags: delivery-estimates, supabase
---

Continuing on the [data model for delivery estimates](/posts/delivery-estimates-2): one thing I need to tackle is capturing the schedules of the carrier and the warehouse.

There are several components that go into it:

- **Warehouse's cutoff times**: the warehouse has time it needs to receive an order by to guarantee it goes out on the same day. Order placed after the cuttof times go out on the following business day. These times can be different depending on each weekday.
- **Warehouse's weekly schedule**: Each warehouse can have it's own weekday schedule, ie one may close on Saturday and Sunday, while another is open 7 days a week.
- **Carrier's delivery schedule**: Some carriers deliver 7 days a week, others like USPS doesn't delivery on Saturday.
- **Carrier's holiday schedule**: Each carrier can have days where they are closed. The schedule can be different across each country/state/province.
- **Warehouse's holiday schedule**: The warehouse may have their own holidays, for example a warehouse may be closed for Jewish holidays like Rosh Hashana

I think the data model now has all the components needed to estimate the delivery.

## Code

These are the new tables I added:

```sql
create table carrier_holidays (
  id serial primary key,
  carrier_id bigint references carriers not null,
  country_id bigint references countries not null,
  subdivision_id bigint references subdivisions not null,
  name varchar not null,
  date date not null
);

create unique index carrier_holidays$main on carrier_holidays (carrier_id, date, country_id, subdivision_id);

create table warehouse_cutoffs (
  id serial primary key,
  name varchar not null,
  account_id bigint references accounts not null,
  warehouse_id bigint references accounts not null,
  weekday int not null,
  open boolean not null default true,
  time time with time zone not null
);

create unique index warehouse_cutoffs$main on warehouse_cutoffs (account_id, warehouse_id, weekday);

create table warehouse_holidays (
  id serial primary key,
  name varchar not null,
  account_id bigint references accounts not null,
  warehouse_id bigint references accounts not null,
  date date not null
);

create unique index warehouse_holidays$main on warehouse_holidays (account_id, warehouse_id, date);
```

And I adjusted `carriers` table to store `weekdays`:

```sql
create table carriers (
  id serial primary key,
  name varchar not null,
  weekdays integer[] default '{1,2,3,4,5,6,7}'
);
```
