import marked from 'marked'
import { getPosts } from './posts.js'

const since = process.argv[2]

let template = ''

getPosts().forEach(post => {
  const { experiment, permalink, title } = post.data

  if (experiment <= since) return

  template += `- [#${experiment} - ${title}](https://1000experiments.dev/posts/${permalink})\n`
})

console.log(marked(template))
