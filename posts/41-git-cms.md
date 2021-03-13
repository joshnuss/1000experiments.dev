---
title: Git-based CMS
experiment: 41
date: "2021-03-12"
permalink: git-cms
tags: git, cms
---

It seems all my ideas today follow the same vein: "x for developers"

So what would a CMS designed for developers look like?

One idea is to use a git-based workflow. It would enable:

- Storing all content in a Git repo. ie. in YAML or JSON files
- Reviewing changes with PRs.
- Each PR gets a branch deploy for reviewing.
- Merging PR deploys contentto production.
- Data format is very flexible.
- Can support multi-lingual data.
- Can push notify content changes via a WebSocket.

## Accessing content

Content can be accessed via HTTP:

```bash
curl localhost:3000/content/<content-path>
```

Let's say we have a directory structure like this:

```
-- content/
---- team/
------ john.yml
------ jane.yml
```

And each `.yml` file looks like this: (format is arbitrary)

```yaml
name: ...
position: ...
bio: ...
```

Then we can use the file path to query:

```bash
> curl http://localhost:3000/content/team/john
{
  "team": {
    "john": {
      "name": "John Smith"
      "position": "Account Executive"
    }
  }
}
```

Since each `yaml` file is a dictionary, we can query inside it too:

```bash
> curl http://localhost:3000/content/team/john/name
{
  "team": {
    "john": {
      "name": "John Smith"
    }
  }
}
```

or we can zoom out and query an entire folder:

```bash
> curl http://localhost:3000/content/team
{
  "team": {
    "john": { ... },
    "jane": { ... }
  }
}
```

or even multiple queries at once:

```bash
> curl http://localhost:3000/content/[team/john/name,team/jane/name]
{
  "team": {
    "john": {
      "name": "John Smith"
    },
    "jane": {
      "name": "Jane Doe"
    }
  }
}
```

The entire folder structure and its files are turned into a one queryable (nested) dictionary.
