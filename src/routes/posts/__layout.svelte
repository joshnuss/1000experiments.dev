<script context="module">
  import SEO from 'svelte-seo'
  import SignupForm from '$lib/components/SignupForm.svelte'
  import { findPost } from '$lib/posts'

  export async function load({ page }) {
    const post = findPost(page.path.split('/')[2])

    if (!post) {
      return {
        status: 404,
        error: new Error('Post could not be found')
      }
    }

    return {
      props: {
        post
      }
    }
}
</script>

<script>
  import { onMount } from 'svelte'
  import { format } from 'date-fns'
  import Tags from '$lib/components/Tags.svelte'
  export let post

  /* eslint-disable no-undef */
  onMount(() => {
    if (typeof(twttr) !== 'undefined')
      twttr.widgets.load()
  })
</script>

<svelte:head>
  <title>Experiment #{post.experiment}: {post.title}</title>
  <meta name="keywords" content={post.tags.join(',')}/>
</svelte:head>

<SEO
  title="Experiment #{post.experiment}: {post.title}"
  keywords={post.tags.join(',')}
  twitter={{
    site: "@joshnuss",
    title: post.title,
    description: `Experiment #${post.experiment}`
  }}
  openGraph={{
    title: post.title,
    type: "article",
    url: post.url,
    article: {
      publishedTime: post.date,
      modifiedTime: post.timestamp,
      tags: post.tags
    }
  }}
/>

<a href="/">Experiments</a> &gt;

<h1>{post.title}</h1>

<p class="overview">
  <span>
    Experiment #{post.experiment}
  </span>
  ●
  <span class="date">{format(post.date, 'do MMMM, yyyy')}</span>
  ●
  <span class="author">by <a href="https://twitter.com/joshnuss">Joshua Nussbaum</a></span>
</p>

<div class="content">
  <slot/>
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
