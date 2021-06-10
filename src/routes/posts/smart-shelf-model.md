---
title: "Smart Shelf: Shelf model"
experiment: 199
date: "2021-06-10"
permalink: smart-shelf-model
tags: ar, 3d, openscad
---

Before I can record the dimensions and placement of each book, I need the dimensions of the shelf.

In my living room I have an [Ikea Kallax Bookshelf](https://www.ikea.com/ca/en/p/kallax-shelf-unit-black-brown-10275862), so I will create a 3D model using [OpenSCAD](https://openscad.org/), and then load it using [Three.js](https://threejs.org).

## Code

OpenScad code for shelf model:

```openscad
height = 147;
width = height;
depth = 39;
outer_thickness = 3.72;
inner_thickness = 2.5;
inner_height = 33;
inner_width = inner_height;

module horizontal_board() {
  cube([width,depth,outer_thickness]);
}

module vertical_board() {
  cube([outer_thickness,depth,height-(2*outer_thickness)]);
}

color("black")
union() {
  horizontal_board();

  translate([0, 0, height-outer_thickness])
  horizontal_board();

  translate([0, 0, outer_thickness])
  vertical_board();

  translate([width-outer_thickness, 0, outer_thickness])
  vertical_board();

  echo("outer", width);
  echo("inner", inner_width);

  for ( i = [1 : 3]) {
    translate([outer_thickness - inner_thickness/2 + (inner_thickness + inner_width)*i, 0, outer_thickness])
    cube([inner_thickness, depth, height-(2*outer_thickness)]);
  }

  for ( i = [1 : 3]) {
    translate([outer_thickness, 0, outer_thickness - inner_thickness/2 + (inner_thickness + inner_width)*i])
    cube([height-(2*outer_thickness), depth,  inner_thickness]);
  }
}
```


## Demo

<img alt="animation" src="https://res.cloudinary.com/dzwnkx0mk/image/upload/v1623303234/1000experiments.dev/kallax-3d-model_bf5r3u.png"/>
