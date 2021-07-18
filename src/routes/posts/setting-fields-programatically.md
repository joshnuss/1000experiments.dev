---
title: "Claim AutoFill: Settings fields programatically"
experiment: 212
date: "2021-07-16"
permalink: setting-fields-programatically
tags: svelte, javascript, carrierwave
---

After my last experiment [create an autofill extension](https://1000experiments.dev/posts/chrome-autofill-extension), I wanted to to figure out how to set different input fields programatically.

Most are easy, but setting `<input type="file"/>` was a little harder.

## Text field

Setting a text field is straight forward and it works similarly for most field types, like `number`, `tel`, etc...

```javascript
document.querySelector(`input[type=text][name=${fieldName}]`).value = newValue
```

## Select field

Works similar to a text field, except the `value` maps to the value set by `<option value="...">...</option>`

```javascript
document.querySelector(`select[name=${fieldName}]`).value = newValue
```

## Checkbox

Similar to other inputs, except instead of setting the `.value` attribute, it uses `.checked`:

```javascript
document.querySelector(`input[type=checkbox][name=${fieldName}]`).checked = boolean 
```

## Files

This one was a bit tricky. It required converting to files to base64 URLs and using `DataTransfer` objects.

So say I have a base64 image URL, like this:

```
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlcAAACVC.....
```

To load it into the `<input type="file"/>`:

```javascript
// split on comma to remove the first part "data:image/png;base64,"
const fileEncoded = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlcAAACVC.....'.split(',')[1]
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
