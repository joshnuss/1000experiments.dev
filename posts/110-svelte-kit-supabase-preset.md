---
title: Svelte-kit supabase preset
experiment: 110
date: "2021-04-08"
permalink: svelte-kit-supabase-preset
tags: svelte, supabase
---

There's a handy tool for [`svelte-kit`](https://kit.svelte.dev) called [`svelte-add`](https://www.npmjs.com/package/svelte-add), which can quickly configure `svelte-kit` to do different things with presets. ie setup tailwind, bulma, etc

Figured it would be cool to support supabase too. So I created a project to that.

## Usage

Install svelte-kit:

```bash
npm init svelte@next
```

Configure supabase:

```bash
npx svelte-add joshnuss/svelte-supabase
```

That will add the `@supabase/supabase-js` npm project, and configure a `.env` file for you.

## Future

In the future it could also bootstrap the data access code.

I think there 3 ways to configure that:

- **Public access**: using public key, server-side or client-side.
- **Private access**: using private key, only available server-side.
- **Impersonating**: using the `accessToken` of the user, this only works server-side. The access token would need to be first verified via `jsonwebtoken`.

## Code

[Full version](https://github.com/joshnuss/svelte-supabase)

```javascript
// preset.js
import { Preset, color } from 'apply'

Preset.setName('svelte-add/supabase')
Preset.editNodePackages().addDev("@supabase/supabase-js", "^1.8.0").withTitle("Installing `@supabase/supabase-js`")

Preset.env().createIfMissing()
  .set('VITE_SUPABASE_URL', '<your-supabase-url>')
  .set('VITE_SUPABASE_PUBLIC_KEY', '<your-supabase-public-key>')
  .set('SUPABASE_PRIVATE_KEY', '<your-supabase-private-key>')
  .set('SUPABASE_JWT_SECRET', '<your-supabase-jwt-secret>')

Preset.edit('.gitignore').update(content => {
  if (content.match(/^\.env/m)) {
    return content
  }

  return content + ".env\n"
})

Preset.instruct([
  `Run ${color.magenta("npm install")}, ${color.magenta("pnpm install")}, or ${color.magenta("yarn")} to install dependencies`,
  `Add your supabase keys to your ${color.green('.env')} file`
]).withHeading('Completing setup')
```
