---
title: IDP login flow
experiment: 223
date: "2022-06-10"
permalink: idp-login-flow
tags: idp, auth, stripe
---

Yesterday I made progress on the [signup flow](/posts/idp-signup-flow), today I shift attention to the login flow.

## Plan

The login consists of redirecting the user to the OAuth provider, handling the return back. And sending the user back to the app with a JWT and refresh token.

It will also need to handle refresh tokens and provide a way to revoke tokens. JWTs are issued with short expiration (15 minutes), but once revoked all services that use the JWT should be notified. The refresh token will also stop working immediately.

## Endpoints

- `/signin`: Sign in with default OAuth provider. Redirects to `/signin/<default-provider>`. Shows UI if user is a member of multiple accounts.
- `/signin/:provider`: Redirect to specific OAuth provider.
- `/integrations/oauth2/callback`: Handle return from OAuth provider. Checks for user record, drops a cookie, issues JWT/refresh token and redirects to the configured `signin.success` URL.
- `/refresh`: Refreshes and returns the new access token.
- `/signout`: Sign out. Wipes out the cookie and revokes tokens. Sends a webhook to notify services about revoked token. Redirects to the configured `signout.success` URL.

## Code

https://github.com/joshnuss/idp-experiment/commit/c4dafa2db2cc35e3d8f1b00b6fab2ff282883732

## Demo

Here is a screenshot of a JWT token issued by the identity provider.

Notice it contains a bunch of info about the subscription. This is so that apps using the JWT can adjust their features based on payment status (trialing, past due, etc) or based on the plan. For apps doing metered billing, they can use the subscription id to record usage via Stripe's [Usage Records API](https://stripe.com/docs/api/usage_records).

<img alt="screenshot of JWT" src="https://res.cloudinary.com/dzwnkx0mk/image/upload/v1654937082/1000experiments.dev/JSON-Web-Tokens-jwt-io_ycqfen.png"/>

## Next up

- Ability to close accounts and capture reason for closing account.
- Support changing plans usign a link or via billing portal UI.

## Notes

- Need to handle multiple users-per-account and multiple accounts-per-user
- Filter out closed accounts and deleted/revoked users
- Look into how this will work with SSO (single-sign-on)
