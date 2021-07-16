---
title: Chrome autofill extension
experiment: 211
date: "2021-07-16"
permalink: chrome-autofill-extension
tags: svelte, chrome, carrierwave
---

As I talk with more customers, many say that filing claims with carriers are painful. Often packages are damaged, late or lost and theres a ton of manual data entry to do to file.

The major carriers (UPS, FedEx, USPS, DHL), don't have an API for filing claims, probably because it's not in their best interest to make it easy.


## What if?

What if it could be automated? It would probably save 5-10 minutes per filing. That's a lot of savings if you need to file hundreds of claims a month (very plausible if you ship 10K packages a month)

One solution I came up with is a Chrome extension that autofills the form for you. That means one click to fill out the form, including attaching files like receipts or photos of damage.

## Building an extension

I found a useful article for [building an extension with Svelte](https://maurogarcia.dev/maurogarcia.dev/posts/how-to-build-your-next-chrome-extension-with-svelte/), but I had to make some changes

## Code

There needs to be a [content script](https://developer.chrome.com/docs/extensions/mv3/content_scripts/) that handles receiving messages from the extension. So I defined an `src/contentScript.js` and updated rollup to generate to builds, one for the extension UI, and one for the content script.

It was just a matter of exporting an array from the `rollup.config.js`:

```javascipt
// rollup.config.js
const extension = {
  input: 'src/extension.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/extension.js'
  },
  plugins: [
    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production
      }
    }),
    css({ output: 'extension.css' }),
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    !production && serve(),
    !production && livereload('public'),
    production && terser({
      compress: {
        drop_debugger: false
      }
    })
  ],
  watch: {
    clearScreen: false
  }
}

const contentScript = {
  input: 'src/contentScript.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/contentScript.js'
  },
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    production && terser({
      compress: {
        drop_debugger: false
      }
    })
  ],
  watch: {
    clearScreen: false
  }
}

// export 2 builds
export default [extension, contentScript]
```

Then in `src/contentScript.js`:

```javascript
/*
 * this runs in the context of the page
 * and receives messages from the extension
 */

/*global chrome */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type == 'set') {
    // update a field with value received from extension 
    document.querySelector(`input[name=${message.field}]`).value = message.value
  }
})
```

Then in the extension, I can send a message from Svelte:

```html
<!-- App.svelte (displayed in extension popup) -->
<script>
  function click() {
    sendMessage({
      type: 'set',
      field: 'q',
      value: 'test 1234'
    })
  }

  function sendMessage(message) {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
        console.log(response.farewell)
      })
    })
  }
</script>

<main>
  <button on:click={click}>Do it</button>
</main>
```

## Demo

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1626421782/1000experiments.dev/chrome-autofill-extension_fsnff6.mp4"/>

## Notes

- It will need more experiments:
  - A UI that shows a list of tracking number ready for claims
  - Support filling in different types of fields: text, select, currenct, file field (PDF, PNG etc..)
  - Detect if on UPS/USPS/FedEx/DHL website
  - Starting process should ensure user is logged in to carrier site, or instruct them to.
  - Create a compelling video demo to be shared with prospects to ensure idea is viable
