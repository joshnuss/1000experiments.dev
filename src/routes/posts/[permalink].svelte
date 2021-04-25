<script context="module">
  import { findPost } from '@/posts'

  export function preload(page) {
    return { post: findPost(page.params.permalink) }
  }
</script>

<script>
  import { onMount } from 'svelte'
  import { format } from 'date-fns'
  import highlight from '@/highlight'
  import Tags from '@/components/Tags.svelte'
  export let post

  onMount(() => {
    if (typeof(twttr) !== 'undefined')
      twttr.widgets.load();
  })
</script>

<svelte:head>
  <title>Experiment #{post.experiment}: {post.title}</title>
  <meta name="keywords" content={post.tags.join(',')}/>
</svelte:head>

<span class="experiment">Experiment #{post.experiment}</span>
<Tags tags={post.tags}/>

<h1>{post.title}</h1>

<p>
  <span class="date">{format(post.date, "do MMMM, yyyy")}</span>
  ●
  <span class="author">by <a href="https://twitter.com/joshnuss">Joshua Nussbaum</a></span>
</p>

<div class="content" use:highlight>
  {@html post.html}
</div>

<a href="/">view all experiments</a>

<style>
  h1 {
    margin-top: 10px;
  }

  :global(code) {
    font-size: 1.1rem !important;
  }

  .author a {
    text-decoration: none;
  }
</style>
