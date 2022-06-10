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

- `/signup?product=pro&amp;period=monthly`: Begins the signup flow. Redirects to the OAuth provider intake. Uses the default product. Query params are optional.
- `/signup/:provider?product=pro&amp;period=monthly`: Begins the signup flow. Redirects to the OAuth provider intake. Uses a specific product. Query params are optional.
- `/integrations/oauth2/callback`: Handles returning OAuth users. It creates a user record and begins the payment flow.
- `/integrations/stripe/checkout/success`: Handles successful Stripe checkout. Creates the account, and member record, marking the user as the owner and persisted the Stripe customer id and subscription id. Redirects to the configured `signup.success` URL.
- `/integrations/stripe/checkout/canceled`: Handles a canceled Stripe checkout. Redirects to the configured `signup.canceled` URL.
- `/integrations/stripe/events`: Handles Stripe webhooks.

## Config

The configuration looks like this:

```javascript
// config.js
export default {
	domain: 'https://id.myapp.tld',
	callbacks: {
		'signup.success': 'https://myapp.tld/welcome-aboard',
		'signup.canceled': 'https://myapp.tld/',
		'signup.failed': 'https://myapp.tld/?message=signup-failed',
		// more callbacks to come: login.success, signout.success, plan.update, account.closed etc..
	},

	defaultProvider: 'bogus',
	providers: {
		bogus: {
			client_id: 'dummy-client-id',
			client_secret: 'dummy-client-secret'
		},
		google: {
			client_id: '...',
			client_secret: '...'
		}
	},

	defaultProduct: 'basic',
	defaultPeriod: 'monthly',
	products: {
		basic: {
			// stripe product id
			id: 'prod_xyz1234',
			prices: {
				// stripe price ids
				monthly: 'price_xyz1234',
				yearly: 'price_xyz1234'
			}
		}
	},

	stripe: {
		privateKey: process.env['STRIPE_PRIVATE_KEY']
	}
}
```

## Code

https://github.com/joshnuss/idp-experiment

## Notes

- Didn't have time to integrate database or JWT access tokens. Maybe that's the next part.
- Investigate login flow too
