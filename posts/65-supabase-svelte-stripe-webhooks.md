---
title: Webhooks with supabase, svelte-kit and Stripe
experiment: 65
date: "2021-03-21"
permalink: supabase-svelte-stripe-webhooks
tags: svelte, supabase, stripe
---

Did some digging into setting up webhooks with stripe. 

When Stripe sends the `checkout.session.completed` event, it passes along the `metadata.userId` that was attached when the checkout was created. That is the link back to user's record in supabase. We use it to locate the user and mark their `payment_status` to `paid`. We also save the `customer_id` and `subscription_id`, just in case we need them in the future.

It's really cool that we can define this logic once in svelte-kit and deploy it either as a serverless function or as a dedicated backend server without any editing.

## Code

```javascript
// in src/routes/webhooks/stripe.js
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const {env} = process

// construct stripe and supabase object
const stripe = new Stripe(env.STRIPE_PRIVATE_KEY)
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_PRIVATE_KEY)

// handle POST /webhooks/stripe
export async function post(req) {
  let data
  let eventType

  const webhookSecret = env.STRIPE_WEBHOOK_SECRET

  // verify the signature when possible
  if (webhookSecret) {
    let signature = req.headers["stripe-signature"]
    let event

    try {
      // query stripe to get event using signature
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        webhookSecret
      )
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`)
      return { status: 400 }
    }

    // extract data from query result
    data = event.data
    eventType = event.type
  } else {
    // fallback to extracting from payload
    data = req.body.data
    eventType = req.body.type
  }

  const { object } = data

  // handle different cases
  switch (eventType) {
    case 'checkout.session.completed':
      // subscription creation was successful, so provision:

      await updateUser('id', object.metadata.userId, {
        customer_id: object.customer,
        subscription_id: object.subscription,
        active: true,
        payment_status: 'paid'
      })
      break
    case 'invoice.paid':
      // recent invoice was paid, keep user active
      await updateUser('customer_id', object.customer_id, {active: true, payment_status: 'paid'})
      break
    case 'invoice.payment_failed':
      // a payment failed, mark the user as having a failed payment
      // that way we can notify them in the UI
      await updateUser('customer_id', object.customer_id, {payment_status: 'failed'})
      break
  }

  return {
    status: 200,
    body: { message: 'ok' }
  }
}

// helper to update use in supabase
function updateUser(keyName, key, updates) {
  return supabase
    .from('users')
    .update(updates)
    .match({[keyName]: key})
}
```

## Demo

<img alt="animation" src="https://res.cloudinary.com/dzwnkx0mk/image/upload/v1616314409/1000experiments.dev/supa-sass-stripe_x35dfg.png"/>
