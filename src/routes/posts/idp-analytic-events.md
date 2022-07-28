---
title: "IdP: Analytic events"
experiment: 233
date: "2022-07-28"
permalink: idp-analytic-events
tags: idp, analytics
---

What's unique about the [IdP](/tag/idp) I'm building is it's focused on SaaS.

One of the challenges I saw in building my [last SaaS project](https://getcarrierwave.com) is knowing usage stats of each user. If a user isn't using the system, I'd like to be notified as soon as possible so I can chat with them and find out what's wrong.

Users that don't use the system are bad for business. Zombie users are going to churn anyway, so might as well be direct with them and learn what problems they are having early.

It's a [canary in the coal mine](https://en.wikipedia.org/wiki/Sentinel_species#Canaries_in_coal_mines).

The double whammy is that solving these kind of problems can often be an important feature that the makes the product stickier for everyone.

## Idea

It would be cool if the IdP could track analytics about each member. Resource servers would send usage stats to the IdP via a REST endpoint. 

The IdP would have a ClickHouse database to store these events.

## Code

1. Create a SvelteKit project

```bash
pnpm create svelte@next idp-analytics-experiment
```

2. Create the ClickHouse database via Docker

```bash
# download clickhouse docker image
docker pull yandex/clickhouse-server

# start docker container, expose port 9000, 8123
docker run -d --name clickhouse -p 9000:9000 -p 8123:8123 yandex/clickhouse-server

# connect to clickhouse
docker exec -it clickhouse clickhouse-client
```

Inside `clickhouse-client`, run SQL to create the database and table:

```sql
CREATE DATABASE idp;
USE idp;
CREATE TABLE events (account_id UInt64, event_type String, inserted_at DateTime default now()) ENGINE MergeTree ORDER BY inserted_at;
```

3. Add ClickHouse [npm package](https://www.npmjs.com/package/clickhouse)

```bash
pnpm i -D clickhouse
```

4. Create data access layer

```javascript
// src/lib/analytics.js
import { ClickHouse } from 'clickhouse'

const db = new ClickHouse({ database: 'idp' })

// insert rows into event table
export async function trackEvent(account_id, event_type) {
  const row = { account_id, event_type }

  return await db.insert('INSERT INTO events (account_id, event_type)', [row]).toPromise()
}
```

5. Create SvelteKit route

```javascript
// src/routes/event.js
import { trackEvent } from '$lib/analytics'

export async function POST({ request }) {
  const { accountId, event } =  await request.json()

  try {
    await trackEvent(accountId, event)

    return {
      status: 200,
      body: { message: 'success' }
    }
  } catch {
    return {
      status: 500,
      body: { message: 'database error' }
    }
  }
}
```

## Demo

```bash
curl localhost:3000/event \
  -H 'content-type: application/json' \
  --data '{"accountId": 1, "event": "search"}'
```

## Notes

- This should work with Prisma too, since ClickHouse supports the Postgres wire format. But DDL with `prisma db push` likely won't work.
