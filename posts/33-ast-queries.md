---
title: Researching AST queries
experiment: 33
date: "2021-03-10"
permalink: ast-queries
tags: code-video
---

Linking source code with an animation can be accomplished using line numbers alone, as I've shown in [code hyperlink experiment](/posts/code-editor-hyperlink).

Of course, line numbers can easily get out of sync. So it would be preferable to link by some other kind of expression.

For example, say I want a function in a specific class to be highlighted, imagine I used an expression like `ClassName#functionName` or `class(ClassName) + fun(functionName)`. 

Today I did some research into doing that, but didn't find anything great.
There is of course [acorn](http://npmjs.com/package/acorn) to parse code, but the harder part is querying. I found [astq](http://npmjs.com/package/astq) to query the AST, but the query syntax is a bit cumbersome for my needs.

I thought about rolling my own, but found it would be a bigger task.

Ideally, I'd like a query syntax like:

```
function: fun(name)
var: var(name)
class: class(name)
class + function: class(name) + fun(name)
var inside class function: class(name) + fun(name) + var(name)
multiple: [class(nameA), class(nameB)]
```

Then I could define a hyperlink:

```html
<a href="code:class(Person) + fun(name)">Person.name()</a>
```

I think I'll have to give it some more thought.
