<script>
  export let tags
</script>

<nav>
  {#each tags as tag}
    <a href="/tag/{tag}">#{tag}</a>
  {/each}
</nav>

<style>
  nav {
    display: inline-flex;
    gap: 4px;
  }
</style>
