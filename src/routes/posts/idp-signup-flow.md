---
title: IDP signup flow
experiment: 222
date: "2022-06-10"
permalink: idp-signup-flow
tags: idp, stripe, auth
---

In the last experiment, I worked out the main goals of the [IDP project](/posts/identity-provider-for-stripe). So it's time to look into the signup process.

## Signup flow

When a user signs up, they will be redirected to the OAuth provider authorization URL. When they return back, an user record will be created and they get redirected again. But this time to Stripe checkout, where they'd need to fill out their payment details. Once payment is received they are redirected back and the account, user and member records are created.

With the account created, a JWT token is generated and they are redirected to back to main site.

## Endpoints

There will be several endpoints

- `/signup?product=pro&period=monthly`: Begins the signup flow. Redirects to the OAuth provider intake. Uses the default plan. Query params are optional.
- `/signup/:provider?product=pro&period=<optional>`: Begins the signup flow. Redirects to the OAuth provider intake. Uses a specific plan. Query params are optional.
- `/integrations/oauth2/callback`: Handles returning OAuth users. It creates a user record and begins the payment flow.
- `/integrations/stripe/checkout/success`: Handles successful Stripe checkout. Creates the account, and member record, marking the user as the owner and persisted the Stripe customer id and subscription id. Redirects to the configured `signup.success` URL.
- `/integrations/stripe/checkout/canceled`: Handles a canceled Stripe checkout. Redirects to the configured `signup.canceled` URL.
- `/integrations/stripe/events`: Handles Stripe webhooks.

## Code

https://github.com/joshnuss/idp-experiment

## Notes

- Didn't have time to integrate database or JWT access tokens. Maybe that's the next part.
- Investigate login flow too
