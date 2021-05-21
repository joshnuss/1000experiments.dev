---
title: Supabase transaction test
experiment: 194
date: "2021-05-21"
permalink: supabase-transactions
tags: supabase, nodejs, postgres
---

Continuing from the [last experment](/posts/supa-mini), this one looks into adding transaction support.

## Statefulness

The standard PostgREST uses an HTTP 1x interface which is stateless. But to do database transactions, we need state, in the form of the active transaction.

All we need is a WebSocket, that provides all the operations the HTTP REST interface provides (insert, updates, delete, query):

```bash
curl "localhost:3000/products?id.eq=123"
```

becomes:

```javascript
const ws = new WebSocket('ws://localhost:3000')
const message = {type: 'query', table: 'products', params: {'id.eq': 123}}
ws.send(JSON.stringify(message))
```

Everything you can do with the REST API, you can do with the WS API, but with one addition.

## Transactions

We can start and commit or rollback transaction using messages: `{type: 'tx:start'}`, `{type: 'tx:commit'}`, and `{type: 'tx:rollback'}`

Here's an example using `wscat`:

```bash
> wscat --connect ws://localhost:3000
> {"type": "tx:start"}
< {"tx:start":true}
> {"type": "insert", "table": "products", "payload": {"name": "socks", "price": "444"}}
< [{"id":13,"name":"socks","description":null,"price":"$444.00"}]
> {"type": "insert", "table": "products", "payload": {"name": "socks", "price": "999"}}
< [{"id":14,"name":"socks","description":null,"price":"$999.00"}]
> {"type": "tx:commit"}
```

## API

The api would remain similar from the developers' perspective:

```javascript
// HTTP API
await supabase
  .from('products')
  .insert({...})

// WS API
await supabase.transaction(async tx => {
  await tx
    .from('products')
    .insert({...})

  await tx
    .from('products')
    .insert({...})

  // option to cancel the transaction
  // await tx.rollback()
})
```

## Code

https://github.com/joshnuss/supa-mini/commit/947787b000f28c1c094d95bfe042b26fe68c913e

## Notes

- Add a timeout period to transaction
- Look into how this works with pools
