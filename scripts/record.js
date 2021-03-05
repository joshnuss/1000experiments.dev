const {format} = require('date-fns')
const fs = require('fs')
const glob = require('glob')
const matter = require('gray-matter')
const read = require('read')
const child_process = require('child_process')

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
  let content

  glob.sync('posts/*.md').forEach(file => {
    content = fs.readFileSync(file, 'utf8')
    const experiment = matter(content).data.experiment

    if (experiment && experiment > last) {
      last = experiment
    }
  })

  return last
}

function generate({title, experiment, tags, permalink, assetUrl}) {
  return `---
title: ${title}
experiment: ${experiment}
date: "${format(new Date(), 'yyyy-MM-dd')}"
permalink: ${permalink}
tags: ${tags}
---

Here's the code:


Here's what it looks like:

${assetUrl && assetUrl.endsWith('.mp4') ? `<video controls src="${assetUrl}"/>` : `<img alt="animation" src="${assetUrl}"/>`}
`
}

function prompt(callback) {
  read({prompt: 'title:'}, function (err, title) {
    read({prompt: 'tags:', default: ''}, function (err, tags) {
      read({prompt: 'asset url:', default: ''}, function (err, assetUrl) {
        callback(title, tags, assetUrl)
      })
    })
  })
}

prompt((title, tags, assetUrl) => {
  const path = `posts/${experiment}-${permalink}.md`
  const template = generate({
    title,
    experiment,
    permalink,
    tags,
    assetUrl
  })

  fs.writeFileSync(path, template)
  openEditor(path)
})
