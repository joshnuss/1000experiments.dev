---
title: "Delivery estimates: distance ranges"
experiment: 82
date: "2021-03-27"
permalink: delivery-estimates-4
tags: delivery-estimates, supabase
---

There are many ways to compute the delivery time between two points.

The brute force approach is to compute the shipping time for each postal zone, but that's a lot. In the US there are ~33,000 zip codes, so that means doing 33,000 API lookups for each warehouse and carrier.

A company with 3 warehouses and 2 carriers would require 3 X 2 X 33,000 = 198,000 API requests.

One method to reduce the requests is to measure a reduced set of point in each state.

My first approach is to do this by computing the rate for only 2 points in each state, the closest zip code and the farthest zip code.

I picked a random point for the warehouse, ie Cherry Hill, NJ. It's latitude/longitude is 39.9067637/-75.0315724 

To compute the nearest point for the state of Pennsylvania:

```sql
select p.municipality, p.code from postal_codes as p
inner join subdivisions as s on s.id = p.subdivision_id and s.code = 'PA'
order by st_distance('POINT(-75.0315724 39.9067637)', p.geog)
limit 1
```

That returns `Philadelphia, 19148`, which is correct, it's only a few miles away.

And to compute the farthest point:

```sql
select p.municipality, p.code from postal_codes as p
inner join subdivisions as s on s.id = p.subdivision_id and s.code = 'PA'
order by st_distance('POINT(-75.0315724 39.9067637)', p.geog) desc
limit 1
```

That returns: `West Springfield, 16443`, which is correct, it's on the opposite side of the state, on the north western border of Ohio.

**NOTE**: the order of points with PostGIS is longitude,latitude, NOT latitude,longitude. (That's 4 hours I wont get back)
