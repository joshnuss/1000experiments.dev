import fs from 'fs'
import glob from 'glob'
import matter from 'gray-matter'

export function getPosts() {
  let content
  let posts = []

  glob.sync('src/routes/posts/*.md').forEach(file => {
    content = fs.readFileSync(file, 'utf8')
    const post = matter(content)

    posts.push(post)
  })

  return posts.sort((a, b) => a.data.experiment - b.data.experiment)

  return posts
}
