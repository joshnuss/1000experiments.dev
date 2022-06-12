---
title: "IDP: Changing the plan"
experiment: 224
date: "2022-06-12"
permalink: idp-plan-change
tags: idp, auth, stripe
---

Next up is allows the user to change their plan. There will be 2 ways to do this:

- **Without any UI**: Using a link that specifies the plan and period `id.domain.tld/account/switch/:product?period=<period>`.
- **With a UI**: Using Stripe's [Customer Portal](https://stripe.com/docs/api/customer_portal) via the link `id.domain.tld/account/portal`. The billing portal with handle changing plans and canceling accounts too.

In both cases, only account owners are allowed to modify the plan.

## Endpoints

- `/account/switch/:product`: Updates the subscription for the account. Redirects to the configured `account.updated` URL.
- `/account/portal`: Redirects to Stripe's billing portal.
- `/integrations/stripe/portal/return`: Handles the return from the billing portal. Issues a new JWT and refresh token and redirects to the configured `portal.return` URL.

## Code

### Billing portal

This endpoint creates a billing portal session and redirects the user to it:

```javascript
// src/routes/account/portal.js
import config from '$config'
import db from '$lib/db'
import { getCookieInfo } from '$lib/cookies'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)

export async function get({ request }) {
  // find accountId and userId from cookie
  const { accountId, userId } = getCookieInfo(request.headers.get('cookie'))
  // find member
  const member = await db.member.findFirst({
    where: { accountId, userId },
    include: {
      account: true
    }
  })

  // ensure user is an owner of the account
  if (!member.owner) {
    return {
      status: 401,
      message: "Unauthorized"
    }
  }

  // create billing portal session
  const session = await stripe.billingPortal.sessions.create({
    customer: member.account.stripeCustomerId,
    return_url: new URL('/integrations/stripe/portal/return', config.domain).toString()
  })

  // redirect to billing portal
  return {
    status: 303,
    headers: {
      location: session.url
    }
  }
}
```

### Direct change

This endpoint allows changing the plan with just a link (no billing portal):

```javascript
// src/routes/account/switch/[product].js
import config from '$config'
import db from '$lib/db'
import { getCookieInfo } from '$lib/cookies'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)

export async function get({ url, request, params }) {
  const { product } = params
  const period = url.searchParams.get('period') || 'monthly'
  // find price id from config based on product name and period
  const price = config.products[product]?.prices[period]

  // find accountId and userId from cookie
  const { accountId, userId } = getCookieInfo(request.headers.get('cookie'))
  // find account
  const account = await db.account.findUnique({ where: { id: accountId } })
  // find member
  const member = await db.member.findFirst({ where: { accountId, userId } })

  // ensure user is an owner of the account
  if (!member.owner) {
    return {
      status: 401,
      message: "Unauthorized"
    }
  }

  // get the subscription
  let subscription = await stripe.subscriptions.retrieve(account.stripeSubscriptionId)
  // find the item (only 1 item is currently supported)
  const itemId = subscription.items.data[0].id

  // update the subscription
  subscription = await stripe.subscriptions.update(account.stripeSubscriptionId, {
    items: [
      // replace the price of the existing item
      { id: itemId, price }
    ]
  })

  // update account
  await db.account.update({
    where: { id: accountId },
    data: {
      product,
      paymentStatus: subscription.status.toUpperCase()
    }
  })

  // redirect back
  return {
    status: 303,
    headers: {
      location: config.callbacks['account.updated']
    }
  }
}
```

Full commit here: https://github.com/joshnuss/idp-experiment/commit/54177a054b0f0463d71a9741f9728dbea706fe79


## Notes

- While implementing I realized this the billing portal with also solve the use case of account cancelation. Just have to handle Stripe webhooks.
- Need to look into how token revocation works when changes are being made to account plan. Since account data is in the JWT, it will become stale. Could just issue a new JWT or require a sign-in.
