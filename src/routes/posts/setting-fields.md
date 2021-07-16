---
title: Settings fields programatically
experiment: 212
date: "2021-07-16"
permalink: setting-fields
tags: svelte, javascript, carrierwave
---

After my [last experiment to create an autofill extension](https://1000experiments.dev/posts/chrome-autofill-extension), I set out to figure out how to set different field types.

Most are easy, but setting the file type was a little harder.

## Text field

Setting a text field is easy. It works for most field types `number`, `tel`, etc...

```javascript
document.querySelector(`input[type=text][name=${fieldName}]`).value = newValue
```

## Select field

Works similar to a text field, the `value` corresponds to the value set in `<option value="...">...</option>`

```javascript
document.querySelector(`select[name=${fieldName}]`).value = newValue
```

## Checkbox

Same as input, except instead of setting the `.value` attribute, it uses `.checked` instead:

```javascript
document.querySelector(`input[type=checkbox][name=${fieldName}]`).checked = boolean 
```

## Files

This one was a bit tricky. It required converting to URLs and using `DataTransfer` objects.

So say you have an base64 image URL, like this:

```
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlcAAACVC.....
```

```javascript
// split on comma to remove the first part "data:image/png;base64,"
const fileEncoded = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlcAAACVC.....'.split(',')[0]
// set a filename
const fileName = 'foo.png'

// create a data transfer object
const dt = new DataTransfer()
// add file object with name
dt.items.add(new File([fileEncoded], fileName))

// get the input
const input = document.querySelector(`input[type=file][name=${fieldName}]`)

// set the files using the data transfer object
input.files = dt.files
```

Tricky, but it works!
