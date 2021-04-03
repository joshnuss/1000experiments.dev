---
title: Supabase storage server-side
experiment: 102
date: "2021-04-03"
permalink: supabase-storage-server-side
tags: supabase
---

Supabase storage was [released the other day](https://supabase.io/blog/2021/03/30/supabase-storage), and it's pretty exciting.  I spent a bit of time reading thru the code and trying it out.

One feature that is not provided yet is uploading on the server-side.

So I did some investigating into making it work. The solution is to do an HTTP post with multipart content. It's easy to do client-side because `FormData` is built-in to the browser. For the server side there's a shim [`form-data` package](https://www.npmjs.com/package/form-data) which provides the `FormData` API.

## Code

Here's the code:

```javascript
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import FormData from 'form-data'
import fetch from 'node-fetch'

const supabase = createClient('<your-supabase-url>', '<your-supabase-secret-key>')
const bucketName = '<your-bucket-name-here>'
const filePath = 'cat.gif'
const path = `${supabase.storage.url}/object/${bucketName}/${filePath}`
const headers = supabase.storage.headers

const data = await fs.promises.readFile('cat.gif')
const formData = new FormData()

formData.append('', data, filePath)
formData.append('cacheControl', 3600)

const result = await fetch(path, {
  method: 'POST',
  headers,
  body: formData
})

console.log(result)
```
