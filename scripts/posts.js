const fs = require('fs')
const glob = require('glob')
const matter = require('gray-matter')

module.exports = function getPosts() {
  let content
  let posts = []

  glob.sync('posts/*.md').forEach(file => {
    content = fs.readFileSync(file, 'utf8')
    const post = matter(content)

    posts.push(post)
  })

  return posts
}
