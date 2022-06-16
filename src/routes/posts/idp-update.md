---
title: "IdP: Update"
experiment: 227
date: "2022-06-16"
permalink: idp-update
tags: idp, auth
---

There are a few more features I'd like to prototype before starting a full build:

- **Magic Links**: Passwordless logins
- **Traditional logins**: Logins with passwords and forms
- **Single Sign On (SSO)**: With SAML or Open ID Connect (OIDC)
- **OAuth provider**: The IdP can act as an OAuth provider, not just a consumer.
- **MFA**: Multi-factor authentication. via SMS/E-mail.
- **API**: Ability to access all resources via REST
- **CLI**: Command-line program to perform setup and access API from terminal
- **Dashboard**: A UI for editing the config
- **Layering**: Research if it's possible to use a second instance of the IdP to manage the tenants. ie it runs on top of itself.
- **Deployment**: Test deployment with cloud functions, node, and docker.

Can launch a version without many of these features, but I'd like to investigate them a little to understand how hard they will be to accomplish.
