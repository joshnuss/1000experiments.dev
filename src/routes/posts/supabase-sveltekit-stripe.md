---
title: Supabase + Svelte Kit + Stripe
experiment: 64
date: "2021-03-21"
permalink: supabase-sveltekit-stripe
tags: stripe, supabase, svelte
---

Started building an example app for svelte-kit, that integrates supabase with Stripe. I'm not releasing the code yet because I hope to turn it into a blog series.

## Environment variables

The first challenge was sharing environment variables. `vite` does support `dotenv` for the client side. For protection it only includes variables that start with `VITE_`, ie `VITE_SUPABASE_PUBLIC_KEY`. For the private keys needed by the backend, I couldn't find a place to tell `svelte-kit` to load `dotenv`, so I used `dotenv-cli` instead and prefixed the `dev` and `start` commands with it.


```javascript
// in package.json

"scripts": {
  // prefix with dotenv
  "dev": "dotenv -e .env -- svelte-kit dev",

  // prefix with dotenv
  "start": "dotenv -e .env -- svelte-kit start"
},
```

worked great.

## Stripe checkout

I created an endpoint `src/routes/checkout.json.js`, it handles `POST /checkout` and returns a Stripe checkout `sessionId`.
It requires the `price_id` of the plan, and the supabase `access_token`. It verifies the access token, and extracts the email address and user id from the JWT and attaches it as meta data on the checkout:

```javascript
import Stripe from 'stripe'
import jwt from 'jsonwebtoken'
import { createClient } from '@supabase/supabase-js'

const {env} = process

// init stripe & supabase
const stripe = new Stripe(env.STRIPE_PRIVATE_KEY)
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_PRIVATE_KEY)

// handle HTTP POST
export async function post(req) {
  // priceId and accessToken are required
  const { priceId, cancelUrl, accessToken } = req.body

  try {
    // verify that it's a valid accessToken
    const {email, sub: userId} = jwt.verify(accessToken, env.SUPABASE_JWT_SECRET)

    // create a checkout session
    const session = await createCheckout({
      priceId,
      cancelUrl,
      userId,
      email,
      host: req.headers.origin
    })

    // return sessionId as JSON
    return {
      body: {
        sessionId: session.id
      }
    }
  } catch (e) {
    // when error, return the message
    return {
      status: 400,
      body: {
        error: e.message
      }
    }
  }
}

// helper function to create the checkout object
function createCheckout({ priceId, cancelUrl, userId, email, host }) {
  return stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      }
    ],
    // attach metadata from the JWT
    metadata: {
      userId,
      email
    },
    success_url: new URL('payment/success?session_id={CHECKOUT_SESSION_ID}', host).toString(),
    cancel_url: cancelUrl || host,
  })
}
```

In my future experiments, I will look at handling webhooks from Stripe and updating the user data in Supabase.
