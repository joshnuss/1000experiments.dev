---
title: "IdP: Password-based logins"
experiment: 229
date: "2022-06-18"
permalink: idp-password-logins
tags: idp, auth, passwords
---

In this experiment I look at what it takes to build password based logins with SvelteKit.

## Endpoints

I built the following endpoints

- `/signup`: Signup a new user
- `/signin`: Signin with an email and password
- `/signout`: Signout to clear cookie
- `/forgot-password`: Request a link to reset password
- `/reset-password`: Resets password, verifies code

## Code

Here's the code:

https://github.com/joshnuss/sk-password-logins-experiment

## Notes

- Took a little more work than expected. Just proves that authentication setup can be work. And it doesn't even handle edge-cases.
- Missing confirmation flow
- Might be able to use Stripe Checkout to collect name and email, then registration just needs password/password confirmation to complete. That cuts down on data-entry.
- Interceptor functions seem to help a lot: https://twitter.com/joshnuss/status/1537992595392983040
