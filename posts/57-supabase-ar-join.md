---
title: Supabase ActiveRecord relationships
experiment: 57
date: "2021-03-18"
permalink: supabase-ar-join
tags: supabase
---

Last month I created an [ActiveRecord layer for Supabase](https://github.com/joshnuss/supabase-active-record). There were a few features missing that I'd like to add. Specifically joins and more validation features.

Thinking about joins, I want to support one-to-one and one-to-many relationships to start.

## Belongs To

For the "belongs to" relationship, there would be a `belongsTo()` function to configure the relationship:

```javascript
class Product {
  static config = {
    fields = {
      name: 'string',
      category: belongsTo(Category)
    }
  }
}
```

Each instance would have getters and setters for the relationship and id field:

```javascript
// getter
product.category
// getter for id
product.categoryId

// setter
product.category = category
// setter for id
product.categoryId = category
```

## Has Many

Has many relationships are configured with the `hasMany()` function:

```javascript
class Product {
  static config = {
    fields = {
      name: 'string',
      variants: hasMany(Variant)
    }
  }
}
```

Each instance would have a getter and setter for the relationships:

```javascript
// getter
product.variants
// setter
product.variants
```

A builder function is also provided to create the child record:

```javascript
variant = product.variants.build()

// functionally equivalent to
variant = new Variant()
variant.productId = product.id
```

The list object should have query methods similar to `Scope`:

```javscript
await product.variants.where(...)
await product.variants.findBy(...)
await product.variants.getBy(...)
await product.variants.create(...)
```

## Loading relationships

To manually load a relationship, there would be an async `load()` function:

```javascript
category = await product.load('category')
variants = await product.load('variants')
```

## Joining relationships

Joins would be possible too:

```javascript
await Product
        .all()
        .join('category')
```

Multiple relationships can be joined at the same time:

```javascript
await Product
        .all()
        .join('category', 'vendor', 'variants')
```

It's also possible to use an object with nested joins:

```javascript
await Product
        .all()
        .join('category', {vendor: ['country', 'continent']})
```

Behind the scenes it will be turned into query like this.

```javascript
supabase.from('category, vendor ( name, country (id, name), continent (id, name) )')
```

## Notes

It might be a good idea to implement an identity map.
