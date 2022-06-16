---
title: "IdP: Closing accounts"
experiment: 225
date: "2022-06-12"
permalink: idp-closing-account
tags: idp, auth, stripe
---

In the [last experiment](/posts/idp-plan-change), I integrated the [Stripe billing portal](https://stripe.com/docs/api/customer_portal) and realized it can handle the subscription canceling flow and result in closing the account in the IdP.

So all that's left to do:

- Handle the `customer.subscription.deleted` webhook.
- Update the account `paymentStatus`, `cancelAt`, `canceledAt`, and `closedAt`. Here's an explanation of the fields:
  - `cancelAt` is the timestamp the subscription is expected to cancel.
  - `canceledAt` is the timestamp when the cancelation request was submitted.
  - `closedAt` is the timestamp when the subscription stopped being active. Only set once the subscription is over.
- Revoke tokens for all account members.
- Block signin for members of closed accounts.

## Code

https://github.com/joshnuss/idp-experiment/commit/fe9fa92518ea4ed7e8351e9265df8d5b792a4916

## Notes

- Unfourtunately the `canelation_reason` is not availabe via Stripe's API, but [it is available with Stripe Sigma](https://stackoverflow.com/a/71253916/306520)
- Need to send webhooks when account is closed or token revoked.
- Get a better understanding of the expired token, how is the access token effected? Will it keep work for 15 minutes?
