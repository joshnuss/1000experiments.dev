<script>
  export let posts
</script>

{#each posts as post}
  <article>
    <a href={`/posts/${post.permalink}`} sveltekit:prefetch>
      <h2>#{post.experiment} - {post.title}</h2>
    </a>
  </article>
{/each}

<style>
  h2 {
    display: inline-block;
  }
  a {
    display: flex;
    gap: 5px;
    align-items: flex-start;

    text-decoration: none;
  }
  a h2 {
    text-decoration: underline;
    text-decoration-color: #ddd;
    margin: 5px 0 0 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  a:hover h2 {
    color: var(--highlight-color);
  }
</style>
