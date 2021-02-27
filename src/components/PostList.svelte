<script>
  export let posts
</script>

{#each posts as post}
  <article>
    <a href={`/posts/${post.permalink}`}>
      <span class="experiment">Experiment #{post.experiment}</span>
      <h2>{post.title}</h2>
      <p>{post.summary}</p>
    </a>
  </article>
{/each}

<style>
  a {
    text-decoration: none;
  }
  a h2 {
    text-decoration: underline;
  }
  a:hover h2, a:hover .experiment {
    color: var(--highlight-color);
  }
</style>
