---
title: E-commerce settings in Git
experiment: 51
date: "2021-03-16"
permalink: ecommerce-settings
tags: e-commerce, git
---

Continuing on the git/e-commerce project.

I added `.yml` files for most settings:

- `settings.yml`: general settings
- `tax-rates.yml`: tax rules by country and region
- `shipping-rates.yml`: rates for shipping costs
- `payment.yml`: payment credentials
- `email/*.md`: templates for each email

I also improved the product model to support subscriptions and variants.

## Code

https://github.com/joshnuss/git-ecom/compare/8ed606b2e1dc4ef38713ecdc6c4d432c455bace5...3b94358
