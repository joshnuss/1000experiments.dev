<script>
  import '../app.css'
  import 'prism-themes/themes/prism-material-light.css'
  import Footer from '$lib/components/Footer.svelte'
  // export let segment
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
