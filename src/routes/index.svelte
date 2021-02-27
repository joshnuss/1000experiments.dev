<script>
  import PostList from '@/components/PostList.svelte'

  import {posts} from '@/posts'
</script>

<svelte:head>
  <title>1000experiments.com</title>
</svelte:head>

<h1>1000 Experiments</h1>

<PostList {posts}/>
