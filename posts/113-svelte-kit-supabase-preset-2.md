---
title: Svelte-kit supabase preset
experiment: 113
date: "2021-04-08"
permalink: svelte-kit-supabase-preset-2
tags: svelte, supabase
---

Continuing with the [supabase preset for svelte-kit](/posts/svelte-kit-supabase-preset), figured it would be good to add a boilerplate connection.

This is done by calling `createClient(url, key)`, where `url` and `key` come from the `.env` file.

So now when running:

```sh
npx svelte-add joshnuss/svelte-supabase
```

It adds a file `src/lib/db.js`, which looks like this:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default suspabase
```

The any client code can import it:

```html
<script>
  import db from '$lib/db'

  async function submit() {
    await db
      .from('products')
      .update({price: 1000000})
      .match({id: 1})
  }
</script>
```

## Code

https://github.com/joshnuss/svelte-supabase/commit/1ae9363f8ec0049840fe2cca41cb8f0c11d195bb
