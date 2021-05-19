import { parse } from 'date-fns'

const all = import.meta.globEager('../routes/posts/*.md')

export const posts = Object
  .values(all)
  .map(transform)
  .sort((a, b) => {
    if (a.experiment > b.experiment)
      return -1
    if (b.experiment < a.experiment)
      return 1

    return 0
  })

export function findPost(permalink) {
  return posts.find(post => post.permalink === permalink)
}

export function findByTag(tag) {
  return posts.filter(post => post.tags.includes(tag))
}

function transform({metadata}) {
  if (!metadata.permalink) throw new Error('Missing permalink')
  if (!metadata.date) throw new Error('Missing date')

  const date = parse(metadata.date, 'yyyy-MM-dd', new Date())
  let tags = []

  if (metadata.tags) {
    tags = metadata.tags.split(',').map(str => str.trim())
  }

  return {...metadata, date, tags}
}
