const {format} = require('date-fns')
const fs = require('fs')
const read = require('read')
const child_process = require('child_process')
const getPosts = require('./posts.js')
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
`
}

function prompt(callback) {
  read({prompt: 'title:'}, function (err, title) {
    read({prompt: 'tags:', default: ''}, function (err, tags) {
      read({prompt: 'asset url:', default: ''}, function (err, assetUrl) {
        read({prompt: 'code url:', default: ''}, function (err, codeUrl) {
          callback(title, tags, assetUrl, codeUrl)
        })
      })
    })
  })
}

prompt((title, tags, assetUrl, codeUrl) => {
  const path = `posts/${experiment}-${permalink}.md`
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
