<script>
  import PostList from '$lib/components/PostList.svelte'

  import {posts} from '$lib/posts'
</script>

<svelte:head>
  <title>1,000 Experiments</title>
</svelte:head>

<h1>💡 1,000 Experiments</h1>

<PostList {posts}/>
