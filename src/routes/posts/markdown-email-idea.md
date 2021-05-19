---
title: Markdown email idea
experiment: 43
date: "2021-03-13"
permalink: markdown-email-idea
tags: marketing, email
---

Today I did some thinking about an idea to make transactional e-mail easier for developers.

The idea is to use markdown and git:

```shell
# define an email template
vi templates/welcome.md
```

```markdown
---
subject: Welcome! Confirm your email
---

Hi {{name}}!

Please confirm your email address:

{{confirmationUrl}}
```

then, deploy the template with a git-based workflow:

```bash
git add templates/welcome.md
git commit -m 'welcome template'
git push
```

Now we can call it via curl, pass any values we'd like to interpolate:

```shell
curl domain.tld/welcome \
  -H "authorization: Bearer <api-key>" \
  --data '{"name": "Josh", "confirmationUrl": "...", "recepient": {"email": "user@example.com"}}'
```

That's the gist of it.

I'm gonna try to apply the same concept (markdown + git flow) to a few different areas. Since I've already proven that it can work, my focus will be on the marketing portion.

## Code

https://svelte.dev/repl/0d853435222f475ea60ee66a74315752?version=3.35.0

## Demo

<img alt="animation" src="https://res.cloudinary.com/dzwnkx0mk/image/upload/v1615693568/1000experiments.dev/multiple-interactions_o3lhzz.png"/>
