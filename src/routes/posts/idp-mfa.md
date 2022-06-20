---
title: "IdP: Multi-factor authentication"
experiment: 230
date: "2022-06-20"
permalink: idp-mfa
tags: idp, auth
---

Multi-factor auth (MFA) is an extra layer of protection so that if a password/e-mail address is comprimised, the attacker will need access to a second device, which makes attacking much harder.

It works by sending a user a challenge code, and there are mutliple ways of sending it. Most common are via e-mail, SMS or using an authenticator app. 

Since e-mail and SMS are straightforward, I decided to investigate using an Authenticator app.

## Authenticator QR code

Authenticator apps like [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2) work by scanning a QR code to obtain a shared secret. The secret is embedded in a URL like:

```
otpauth://totp/<email-or-username>?secret=<secret>&issuer=<app-name>
```

For testing, a QR code can be generated via the CLI:

```bash
qrcode "otpauth://totp/user@example.com?secret=testtesttesttest&issuer=MyApp" | display
```

Then scan it with the app.

## SVG QR codes

In a real web app, you probably don't want to have to call a CLI to generate the QR code. Instead an endpoint can be used to generate it, and it's a good idea to use SVG so it scales on all devices.

```javascript
// src/routes/qr.svg.js
import QRCode from 'qrcode-svg'

const issuer = 'MyApp2'

export async function get({ request }) {
  const { user } = request.locals
  const url = `otpauth://totp/${user.email}?secret=${user.secret}&issuer=${issuer}`
  const qr = new QRCode(url)

  return {
    headers: {
      'content-type': 'image/svg+xml'
    },
    body: qr.svg()
  }
}
```

## Verifying the code

Once the user submits their time based code (changes every 30 seconds), we can figure out what the expected code is using a package called [`totp-generator`](https://www.npmjs.com/package/totp-generator)

```javascript
// in src/routes/otp.js
import totp from 'totp-generator'

export async function post({ request }) {
  const data = await request.formData()
  const code = data.get('code')

  // generate expected code
  const user = request.locals.user
  const expected = totp(user.secret)

  if (expected == code) {
    // code matches, set cookie and redirect to homepage
    return {
      status: 303,
      headers: {
        'set-cookie': '...',
        location: '/'
      }
    }
  }

  return { status: 406 }
}
```
