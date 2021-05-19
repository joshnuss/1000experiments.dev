import _ from 'lodash'
import { parse } from 'date-fns'

const all = import.meta.globEager("../routes/posts/*.md")

export const posts = _.chain(all)
  .map(transform)
  .orderBy(['experiment', 'date'], 'desc')
  .value()

export function findPost(permalink) {
  return _.find(posts, {permalink})
}

export function findByTag(tag) {
  return posts.filter(post => post.tags.includes(tag))
}

function transform({metadata}) {
  if (!metadata.permalink) throw new Error('Missing permalink')
  if (!metadata.date) throw new Error('Missing date')

  const permalink = metadata.permalink || filename.replace(/.md$/, '')
  const date = parse(metadata.date, 'yyyy-MM-dd', new Date())
  let tags = []

  if (metadata.tags) {
    tags = metadata.tags.split(',').map(str => str.trim())
  }

  return {...metadata, permalink, date, tags}
}
