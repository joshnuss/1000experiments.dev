<script>
  import '../app.css'
  import { onMount } from 'svelte'
  import { browser } from '$app/env'
  import { page } from '$app/stores'
  import 'prism-themes/themes/prism-material-light.css'
  import * as Fathom from 'fathom-client'
  import Footer from '$lib/components/Footer.svelte'
  // export let segment

  onMount(() => {
    Fathom.load(process.env.VITE_FATHOM_SITE_ID, {
      includedDomains: [ '1000experiments.dev' ]
    })
  })

  // track a page view when the pathname changes
  $: $page.url.pathname, browser && Fathom.trackPageview()
</script>

<header>
  <div class="topper"/>
</header>

<main>
  <slot/>
</main>

<Footer/>

<style>
  main {
    position: relative;
    background-color: white;
    padding: 2em 10px;
    margin: 0 auto;
    box-sizing: border-box;
    min-height: calc(100vh - 143px);
  }

  .topper {
    height: 8px;
    width: 100%;
    background: var(--alternate-color);
  }
</style>
