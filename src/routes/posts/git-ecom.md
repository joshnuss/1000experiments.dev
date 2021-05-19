---
title: Git-based e-commerce backend
experiment: 47
date: "2021-03-15"
permalink: git-ecom
tags: git, e-commerce
---

You can take any SaaS idea and make a developer specific version.
Stripe famously did this for payments, ie "Payments for Developers".

Lately I've thinking about what "E-commerce for developers" would look like. One approach is to use a `git` based workflow.

That means editing product data in your favorite editor, reviewing the settings changes through a PR, and deploying to production with `git push`.

It enables a very flexible data model. If you need another attribute, just add it to your .yml file. No big ceremony.
Want to clone a site? Just fork the repo.
Want to A/B test multiple e-commerce ideas? Generate the .yml with different options.

It would work well for sites that have a small number of products, which is usually the situation most devs are in, ie selling a book or a course.

## Code

https://github.com/joshnuss/git-ecom
