const getPosts = require('./posts.js')

getPosts().forEach(post => {
  const { experiment, permalink, title } = post.data

  console.log(`- [#${experiment} - ${title}](https://1000experiments.dev/posts/${permalink})`)
})
