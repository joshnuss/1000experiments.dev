---
title: Git-based e-commerce backend
experiment: 47
date: "2021-03-15"
permalink: git-ecom
tags: git, e-commerce
---

I think you can take any SaaS idea and make a version specifically tailored for developers.
Stripe famously did this for payments, ie "Payments for Developers".

Lately, I've thinking about what "E-commerce for developers" would look like. One approach is to use a `git` based workflow.

That means editing product data in your favorite editor, reviewing the settings changes through a PR, and deploying to production with `git push`.

I think it could work well for sites that have a small number of products, which is usually the situation most devs are in, ie selling a book or a course.

## Code

https://github.com/joshnuss/git-ecom
