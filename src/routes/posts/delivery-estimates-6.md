---
title: "Delivery estimates: lookups"
experiment: 84
date: "2021-03-27"
permalink: delivery-estimates-6
tags: delivery-estimates, supabase, e-commerce
---

In this experiment I look at what the API could look like.

## Inputs

These are the inputs the backend would need:

- The API key of the account
- One or more products (it can work on product page, cart page or checkout page)
- A postal code or IP address

## Output

The output would contain

- a estimated range in date format (min date & max date)
- the cutoff time (earliest if there are multiple warehouses involved)
- information about the destination. Since we may be guessing the destination from the IP address, it would be helpful to show the country, state, and city in the UI.

## Algorithm

These are the steps the backed should take:

- Verify the API key
- Find all warehouses that have the product(s)
- For each warehouse, find the operating schedule, carrier list, and ingestion speed (for each carrier).
- Find the operating schedule for each carrier.
- Find the delivery speed on destination zip code.
- Pad results based on preferences (optional).
- Sort results to find minimum and maximum.

## Code

Example `curl` call:

```bash
curl domain.tld/estimates -H "authorization: Bearer pk_prod_1234" --date '{"postalCode": "12345", "product": "t-shirt"}'
```

Example backend implementation:

```javascript
// verify api key, sets req.account
app.use(authenticate)

// handle estimation request
app.post('/estimate', (req, res) => {
  // postal code is provided or computed from ip address
  const postalCode = req.params.postalCode || postalCodeFromIP(req.headers['x-forwarded-for'] || req.connection.remoteAddress)

  // error when destination postal code cannot be determined
  if (!postalCode) res.status(400).json({message: "invalid postal code"})

  // find speed info for destination postal code
  const postalCodeInfo = findPostalCodeInfo(postalCode)

  // find warehouses based on product(s)
  const origins = findWarehouses(req.account, req.params.products || [req.params.product])

  // error when no warehouse found
  if (origins.length == 0) res.status(400).json({message: "no origin found"})

  // prepare results and sort
  const results = origins.map(origin => {
    const businessDays = postalCode.deliveryTime + origin.ingestionTime + carrier.routingTime + origin.padding
    const date = nextDate(0, origin.weeklySchedule, origin.holidays)
    const cuttoff = date + origin.cuttoffTime
    const days = nextDate(
      businessDays,
      sum(origin.weeklySchedule, carrier.weeklySchedule),
      sum(origin.holidays, carrier.holidays)
    )
    const date = now() + days

    return {
      cuttoff,
      businessDays,
      days,
      date
    }
  })

  // sort the results
  const sorted = origin.sort(record => record.days)
  // find min
  const minimum = sorted[0]
  // find max
  const maximum = sorted[sorted.length-1]
  
  // return the cuttoff time, destination info and min/max range
  res.json({
    cutoff: minimum.cutoff,
    destination: {
      country: postalCodeInfo.country.iso2,
      subdivision: postalCodeInfo.subdivision.code,
      municipality: postalCodeInfo.municipality,
      postalCode
    },
    minimum: {
      businessDays: minimum.businessDays,
      days: minimum.days,
      date: minimum.date 
    },
    maximum: {
      businessDays: maximum.businessDays,
      days: maximum.days,
      date: maximum.date 
    }
  })
})
```
