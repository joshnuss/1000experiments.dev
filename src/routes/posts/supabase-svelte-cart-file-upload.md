---
title: "Supacart: file upload"
experiment: 112
date: "2021-04-08"
permalink: supabase-svelte-cart-file-upload
tags: e-commerce, svelte, supabase
---

Thanks to Supabase's new storage feature, I was able to bang out file upload for product images.

## File input

Added a `<input type=file>` to the `_Form.svelte` component:

```html
<!-- in admin/src/routes/products/_Form.svelte -->

<input type="file" bind:files accept="image/*" multiple="false"/>
```

## Upload logic

The upload is done in 3 steps:

1. upload the file
2. generate a signed URL with a far future expiration data
3. attach the signed URL to the product during insert/update

To upload and generate the signedURL, I wrapped it in a function:

```js
// in admin/src/lib/db.js

async uploadImage(file) {
  const name = window.crypto.getRandomValues(new Uint8Array(10)).join('') + file.name
  const path = `products/${name}`
  // set a 10 year expiration
  const expiresIn = 60*60*24*365*10

  // upload the image
  await supabase.storage
    .from('images')
    .upload(path, file)

  // generate a signed URL
  const {data} = await supabase.storage
    .from('images')
    .createSignedUrl(path, expiresIn)

  // return the signed URL
  return data.signedURL
}
```

Then setting the image is just a matter of adding a new field to the `products` table

```sql
alter table products add column image varchar
```

And then the image can be set in the create/update screens:

```js

function submit() {
  if (file.length > 0) {
    // upload & sign image
    product.image = await db.products.uploadImage(files[0])
  }

  // update the product, with image url
  db.products.update(product)
}
```

The only part that's missing is resizing the images.
