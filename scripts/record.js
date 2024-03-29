import {format} from 'date-fns'
import fs from 'fs'
import read from 'read'
import child_process from 'child_process'
import {getPosts} from './posts.js'

const experiment = lastExperiment() + 1
const permalink = process.argv[2]

if (process.argv.length < 3)
  throw new Error('file name argument must be specfied')

function openEditor(path) {
  const editor = process.env.EDITOR || 'vim'
  const child = child_process.spawn(editor, [path], {
    stdio: 'inherit'
  })

  child.on('exit', () => {
    console.log('finished')
  })
}

function lastExperiment() {
  let last = 0

  getPosts().forEach(post => {
    const experiment = post.data.experiment

    if (experiment && experiment > last) {
      last = experiment
    }
  })

  return last
}

function generate({title, experiment, tags, permalink, assetUrl, codeUrl}) {
  return `---
title: ${title.includes(':') ? `"${title}"` : title}
experiment: ${experiment}
date: "${format(new Date(), 'yyyy-MM-dd')}"
permalink: ${permalink}
tags: ${tags}
---

## Code

${codeUrl}

## Demo

${assetUrl && assetUrl.endsWith('.mp4') ? `<video controls src="${assetUrl}"/>` : `<img alt="animation" src="${assetUrl}"/>`}

## Notes

-
`
}

function prompt(callback) {
  const defaultTitle = capitalize(permalink.replace(/-/g, ' '))

  read({prompt: 'title:', default: defaultTitle}, function (err, title) {
    read({prompt: 'tags:', default: ''}, function (err, tags) {
      read({prompt: 'asset url:', default: ''}, function (err, assetUrl) {
        read({prompt: 'code url:', default: ''}, function (err, codeUrl) {
          callback(title, tags, assetUrl, codeUrl)
        })
      })
    })
  })
}

function capitalize(text) {
  return text[0].toUpperCase() + text.substr(1)
}

prompt((title, tags, assetUrl, codeUrl) => {
  const path = `src/routes/posts/${permalink}.md`
  const template = generate({
    title,
    experiment,
    permalink,
    tags,
    assetUrl,
    codeUrl
  })

  fs.writeFileSync(path, template)
  openEditor(path)
})
