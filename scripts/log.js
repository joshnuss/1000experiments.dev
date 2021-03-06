const getPosts = require('./posts.js')

getPosts().forEach(post => {
  console.log(
    `[#${post.data.experiment} - ${post.data.title}](https://1000experiments.dev/posts/${post.data.permalink})`
  )
})
