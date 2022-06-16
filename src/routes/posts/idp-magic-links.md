---
title: "IdP: Magic Links"
experiment: 228
date: "2022-06-16"
permalink: idp-magic-links
tags: idp, auth
---

One option many identity systems now offer is magic links. It allows the user to sign in with just their email address, and a link is sent to their e-mail account. (Some support SMS too)

Some people find it annoying to have to go into their e-mail every time they login. But it's an option that some folks like to offer, so I'm considering offering it.

## Implementation

In this experiment, I have 3 flows:

- **Signup flow**: Captures email and name, but doesn't create an user record yet. It stores the form data in the registrations table and creates a magic link
- **Signin flow**: Find a user using the provided e-mail address and create a magic link for them
- **Magic link signup flow**: Validates code, create a user record and redirects.
- **Magic link signin flow**: Validates code, finds the user and redirects.

## Code

https://github.com/joshnuss/sk-magic-links

## Notes

- Skipped writing email logic. Could have used [Postmark API](https://postmarkapp.com/developer/user-guide/send-email-with-api)
- Discoverd that I don't need a registration when using Stripe Checkout, because Stripe Checkout already collects the email and name.
- It might be a good idea to have the list of codes in a separate table. By having an immutable list, all the past codes are known, so if someone clicks on an expired link they get the message "Link has expired". Wheras if the code is mutable, the error message becomes "Link is invalid, code cannot be found".
