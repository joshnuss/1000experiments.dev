---
title: Learning Julia
experiment: 164
date: "2021-04-30"
permalink: learning-julia
tags: julia, learning
---

Thought I would try something a bit different and take a break from the project I've been working the past few weeks.

I decided to spend 90 minutes to learn a bit about the [Julia Programming Language](https://julialang.org)

## Setup

To setup my dev environment, I used [asdf](https://github.com/asdf-vm/asdf) with the [asdf-julia plugin](https://github.com/rkyleg/asdf-julia).

```bash
asdf plugin-add julia https://github.com/rkyleg/asdf-julia.git
asdf install julia 1.6.1
asdf global julia 1.6.1
```

## Impressions

- It's very strong for numerical computation
- Feels influenced by C, R, ruby, javascript
- Lots of nice syntax, for example a fraction can be represented as `2//8`, and it will simplify it to `1//4`, and then you can turn it back to a float `float(2//8) == 0.25`
- Comprehensions are very clean `[(j, i) for i=1:3 for j=1:3 if j==i]`
- It types the arrays for you `typeof([1,2,3]) == Vector{Int64}` while `typeof(["a", "b", "c"]) == Vector{String}`, and if types are mixed, it uses `Vector{Any}`
- The type system is great. Infered types.
- Matrix is easy to use:

```bash
julia> [1:3 5:7]
3×2 Matrix{Int64}:
 1  5
 2  6
 3  7
```

- Null is called `missing`
- Terse syntax is available for functions: `f(x,y) = x + y`
- Operators are functions:

```bash
julia> 1 + 2 + 3
6

julia> +(1,2,3)
6

julia> f = +;

julia> f(1,2,3)
6
```

- Ranges of cells can be updated using the dot syntax: `arr[2:7] .= 99`
- Tuples can be either named or unamed

```bash
julia> (2, 1+2)
(2, 3)

julia> (a=2, b=1+2)
(a = 2, b = 3)
```

- Functions can be composed:

```bash
julia> (sqrt ∘ +)(3, 6)
3.0
```

- Functions can be piped:

```bash
julia> 1:10 |> sum |> sqrt
7.416198487095663

julia> (sqrt ∘ sum)(1:10)
7.416198487095663
```
