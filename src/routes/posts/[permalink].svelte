<script context="module">
  import { format } from 'date-fns'
  import { findPost } from '@/posts'

  export function preload(page) {
    return { post: findPost(page.params.permalink) }
  }
</script>

<script>
  import highlight from '@/highlight'
  import Tags from '@/components/Tags.svelte'
  export let post
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

<style>
  .content {
    font-size: 1.2rem;
  }

  h1 {
    margin-top: 10px;
  }

  :global(code) {
    font-size: 1.1rem !important;
  }
</style>
