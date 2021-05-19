---
title: Cancelations with supabase, svelte-kit and Stripe
experiment: 66
date: "2021-03-21"
permalink: supabase-sveltekit-stripe-cancelations
tags: stripe, supabase, svelte
---

I added support for subscription cancelation to my svelte-kit SaaS template.
Took a little debugging, but it's fairly straightforward.

## Code

Added an endpoint to handle the cancelation request:

```javascript
// in src/routes/cancel.js

import Stripe from 'stripe'
import jwt from 'jsonwebtoken'
import { createClient } from '@supabase/supabase-js'

const {env} = process

// create stripe and supabase client
const stripe = new Stripe(env.STRIPE_PRIVATE_KEY)
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_PRIVATE_KEY)

// handle POST /cancel
export async function post(req) {
  // ensure access token is real
  const token = jwt.verify(req.body.accessToken, env.SUPABASE_JWT_SECRET)

  // get user from supabase
  const { data: user} = await supabase
    .from('users')
    .select('subscription_id')
    .match({id: token.sub})
    .single()

  // delete the subscription in stripe
  await stripe.subscriptions.del(user.subscription_id, {prorate: true})

  return { status: 200, body: '' }
}
```

Added another event in the webhook handler:

```javascript
// ...
case 'customer.subscription.deleted':
  await updateUser('subscription_id', object.id, {
    active: false,
    payment_status: 'canceled'
  })

  break
```

Since I'm relying on the webhook to end the subscription, the browser should be polling until the status is updated. I didn't implement that part yet, but I will look into whether supabase's realtime service can do it. That would be pretty nifty.
