<script context="module">
  import SignupForm from '@/components/SignupForm.svelte'
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

<a href="/">Experiments</a> &gt;

<h1>{post.title}</h1>

<p class="overview">
  <span>
    Experiment #{post.experiment}
  </span>
  ●
  <span class="date">{format(post.date, "do MMMM, yyyy")}</span>
  ●
  <span class="author">by <a href="https://twitter.com/joshnuss">Joshua Nussbaum</a></span>
</p>

<div class="content" use:highlight>
  {@html post.html}
</div>

<Tags tags={post.tags}/>

<a href="/">view all experiments</a>

<div class="container">
  <SignupForm/>
</div>

<style>
  h1 {
    margin-top: 1rem;
  }

  .author a {
    text-decoration: none;
  }

  p.overview {
    font-weight: bold;
    color: #666;
    font-size: 1.2em;
  }

  .container {
    margin-top: 1rem;
  }
</style>
