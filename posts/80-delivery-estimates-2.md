---
title: Delivery estimates - Part 2
experiment: 80
date: "2021-03-26"
permalink: delivery-estimates-2
tags: delivery-estimates
---

In the [previous experiment](/posts/delivery-estimates), I created a database to store delivery estimates.

In the sql, I loading the db with some countries and states, but I couldnt load the `postal_codes` table because there are 33,000 postal codes in the USA, and that's too much data to send to the server.

So I wrote a script to do it, using the `supabase` API client.

The script parses a CSV files I found on the web, and inserts it into the DB (see video below).

## Code

```javascript
import fs from 'fs'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('<supabase-url>', '<supabase-api-key>')
const path = './uszips.csv'
const data = await fs.promises.readFile(path, 'utf8')

const { data: rows } = await supabase
  .from('subdivisions')
  .select('*')

const subdivisions = {}

rows.forEach(row => {
  subdivisions[row.code] = row
})

data.split('\n').forEach(async ( line, index ) => {
  if (index == 0) return
  if (line.trim() == '') return

  const cells = line.split(',')

  let code = cells[0]
  const lat = cells[1]
  const lng = cells[2]
  const municipality = cells[3]
  const state = cells[4]
  const geog = `POINT(${lat} ${lng})`
  const subdivision = subdivisions[state]

  if (!subdivision) {
    console.log(`${state} is not defined`)
    return
  }

  if (code.length == 3) code = '0' + code
  if (code.length == 4) code = '0' + code

  const row = {
    country_id: subdivision.country_id,
    subdivision_id: subdivision.id,
    municipality,
    code,
    geog
  }

  const {data, error} = await supabase.from('postal_codes').insert([row])
  console.log({data, error})
})
```

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1616740211/1000experiments.dev/uploading-postal-codes_kr92x7.mp4"/>
