const {format} = require('date-fns')
const fs = require('fs')
const glob = require('glob')
const matter = require('gray-matter')
const read = require('read')

const experiment = lastExperiment() + 1
const permalink = process.argv[2]

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

function generate({title, experiment, tags, permalink}) {
  return `---
title: ${title}
experiment: ${experiment}
date: "${format(new Date(), 'yyyy-MM-dd')}"
permalink: ${permalink}
tags: ${tags}
---

Content here
`
}

read({prompt: 'title:'}, function (err, title) {
  read({prompt: 'tags:', default: ''}, function (err, tags) {
    const template = generate({
      title,
      experiment,
      permalink,
      tags
    })
    console.log(template)
    const path = `posts/${experiment}-${permalink}.md`
    fs.writeFileSync(path, template)
    console.log(path)
  })
})
