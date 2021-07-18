---
title: "Claim AutoFill: Chrome extension"
experiment: 211
date: "2021-07-16"
permalink: chrome-autofill-extension
tags: svelte, chrome, carrierwave
---

As I talk with more customers, many say that filing claims with carriers is pretty painful. When packages are damaged, late or lost it requires a ton of manual data entry to file claims.

The major carriers (UPS, FedEx, USPS, DHL), don't have an API for filing claims, it's all manual (probably because it's not in their best interest to make it easy).

## What if?

What if it could be automated? It would probably save 5-10 minutes per filing. That's a lot of time savings if you need to file hundreds of claims a month (very common if you ship 10K packages a month)

One solution I came up with is a Chrome extension that autofills the form for you. That means one click to fill out the form for hundreds of claims all in one shot. It would even attach files like receipts or photos of damage.

## Building an extension

So I set out to build an prototype. I found a useful article for [building an extension with Svelte](https://maurogarcia.dev/maurogarcia.dev/posts/how-to-build-your-next-chrome-extension-with-svelte/), but I had to make some changes.

## Code

I needed a [content script](https://developer.chrome.com/docs/extensions/mv3/content_scripts/) to handle receiving messages from the extension. So I defined an `src/contentScript.js` and updated the rollup config to generate two builds, one for the extension UI, and one for the content script.

Multiple builds was just a matter of exporting an array of builds definitions from the `rollup.config.js`:

```javascript
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

// export array of 2 builds
export default [extension, contentScript]
```

Then in `src/contentScript.js`:

```javascript
/*
 * this runs in the context of the page
 * and receives messages from the extension
 */

/*global chrome */

// handle incoming messages and set fields
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type == 'set') {
    // update a field with value received from extension 
    document.querySelector(`input[name=${message.field}]`).value = message.value
  }
})
```

Then in the extension, I can send messages from Svelte `on:click`:

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
    // find active tab
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      // send a message to that tab (will always be one)
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

I tested by filling out the GitHub searchbar. I added a rule in extensions `manifest.json`:

```js
// ...

"content_scripts": [
  {
    "matches": ["*://*.github.com/*"],
    "js": ["build/contentScript.js"]
  }
],

```

<video controls src="https://res.cloudinary.com/dzwnkx0mk/video/upload/v1626421782/1000experiments.dev/chrome-autofill-extension_fsnff6.mp4"/>

## Notes

- It will need more experiments:
  - A UI that shows a list of tracking number ready for claims
  - Support filling in different types of fields: text, select, currenct, file field (PDF, PNG etc..)
  - Detect if on UPS/USPS/FedEx/DHL website
  - Starting process should ensure user is logged in to carrier site, or instruct them to.
  - Create a compelling video demo to be shared with prospects to ensure idea is viable
  - Filling a batch, ie looping thru the screens until all claims are filed
