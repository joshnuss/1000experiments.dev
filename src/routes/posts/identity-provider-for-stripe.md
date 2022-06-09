---
title: Identity provider for Stripe
experiment: 221
date: "2022-06-09"
permalink: identity-provider-for-stripe
tags: stripe, idp, auth
---

After trying to build a couple of SaaS projects, one requirement I deal with again and again is **gating access based on payment**.

Unfourtunately, I couldn't find an option out there that would work for me out of the box. There are lots of options for authentication, and Stripe Checkout or Elements are easy to add. What's missing is something that connects the authentication and billing together.

From what I can tell, **these are my options**:

- **Roll your own**: Building a basic version isn't too too hard (maybe 1-2 weeks?), but they always end up needing the same features. For example: multiple users per account, OAuth, SSO, MFA, blocking account access when payment fails, ability to change prices, to name a few. I really don't want to rebuild this for each app. I'd prefer a shared solution that can be integrated quickly (ideally in less than 10 minutes).
- **[Auth0](https://auth0.com)**: It handles authentication, but it doesn't integrate billing. Also, I find it overly complicated. I want something that is dead simple.
- **[Supabase](https://supabase.com)**: It does the authentication part, but doesn't gate based on Stripe. Also it's an integration on the database level, I'd prefer something that is agnostic to the storage medium. For example, I often have a service layer in my app or multiple services with different stacks that all need access to info about the current user. Also with supabase each request to my app could result in multiple REST calls to Supabase which would slow things down.
- **[Clerk](https://clerk.dev)**: Requires integration of UI components, only React support ATM. Also billing integration isn't supported.
- **[Memberful](https://memberful.com)**: Takes 5-10% of your transaction fees. Not JWT based, requires GraphQL API calls to get info about "current user". Seems to be more focused on WordPress. I want this to be focused on SaaS apps only. So it's much slimmer.

## The idea

An **identity provider** (IDP) specifically **for SaaS** apps.

It should:

- Take less that **10 minutes to integrate**.
- Handle the **Stripe integration** for checkout and billing portal.
- Support **OAuth**, ie Google, GitHub, Twitter etc..
- Handle **SSO** (Single sign on), making enterprise deals possible without extra work.
- Allow **teams**, ie. multiple users per account.
- **JWT based**. No need to contact IDP to verify access. The JWT includes info about member's payment status and plan.
- **Open source**. Using a BSL license.
- **Self hostable** for free.
- **Paid hosting** option - assuming this idea works out and people actually want to pay for it ;) For now it's just an experiment

## Implementation

Each app gets its own subdomain, for example if the app was `mydomain.tld`, `id.mydomain.tld` would be handled by the idp:

Then to integrate signup on a site, it would require just one link:

```html
<a href="https://id.mydomain.tld/signup?plan=optional">
  Sign up
</a>
```

This would send the user into the OAuth flow, followed by a Stripe Checkout, and then back to the main site.

On return, a JWT token will be passed as a query param. It will contain the standard JWT stuff, with the audience attribute `aud:` set to the plan ID.

## Code

The first thing I did was read the [OAuth 2.0 RFC](https://datatracker.ietf.org/doc/html/rfc6749) and implement an OAuth client:

```javascript
// oauthClient.js
import fetch from 'node-fetch'

// some provider data is copied from github.com/simov/grant
const providers = {
  bogus: {
    authorize_url: "http://localhost:8282/auth/request/path",
    access_url: "http://localhost:8282/access/token/request",
  },

  google: {
    authorize_url: "https://accounts.google.com/o/oauth2/v2/auth",
    access_url: "https://oauth2.googleapis.com/token"
  },

  github: {
    authorize_url: "https://github.com/login/oauth/authorize",
    access_url: "https://github.com/login/oauth/access_token",
  },
}

export default class OAuthClient {
  constructor(config) {
    this.config = config
    this.provider = providers[config.provider]

    if (!this.provider) throw new Error(`Unknown OAuth provider ${config.provider}`)
  }

  // generate a url to the OAuth2 provider's intake
  authorizeUrl() {
    const { client_id, domain } = this.config
    const url = new URL(this.provider.authorize_url)
    const params = url.searchParams

    params.set('response_type', 'code')
    params.set('client_id', client_id)
    params.set('redirect_uri', `https://${domain}/integrations/oauth2/callback`)

    return url.toString()
  }

  // once the OAuth provider redirects the user back with a `code` param
  // use this function to get the access token
  async fetchAccessToken(code) {
    const { client_id, client_secret } = this.config

    const response = await fetch(this.provider.access_url, {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id,
        client_secret
      })
    })

    return {
      success: response.ok,
      payload: await response.json()
    }
  }
}
```

## Notes

- Used [fake-oauth2-server](https://github.com/patientsknowbest/fake-oauth2-server) to test it
- Next, look into creating a demo of the signup flow
