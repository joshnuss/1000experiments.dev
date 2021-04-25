<script>
  import PostList from '@/components/PostList.svelte'

  import {posts} from '@/posts'
</script>

<svelte:head>
  <title>1,000 Experiments</title>
</svelte:head>

<h1>💡 1,000 Experiments</h1>

<PostList {posts}/>
