import Layout from '../core/Layout.js'

import Wall from '../cells/Wall.js';
import Floor from '../cells/Floor.js';
import Door from '../cells/Door.js';

class BinaryTreeMaze {
  constructor(width, height, size) {
    this.layout = new Layout();

    this.size = size;
    this.width = width;
    this.height = height;

    this.timeout = 25;
    this.steps = [];

    this.choices = [
      function(row, index, type = this.floor) { this.layout.addCol(row - 1, index, type.call()) },
      function(row, index, type = this.floor) { this.layout.addCol(row, index - 1, type.call()) }
    ];

    this.build();
  }

  wall() {
    return new Wall();
  }

  floor() {
    return new Floor();
  }

  door() {
    return new Door();
  }

  build(ctx) {

    for (let row = 0; row < this.height; row++) {
      this.layout.addRow(row);

      this.setRow(ctx, row);
    }
  }

  setRow(ctx, row) {
    for (let col = 0; col < this.width; col++) {
      this.setCol(ctx, row, col);
    }
  }

  setCol(ctx, row, col) {
    if (row % 2 == 0 || col % 2 == 0) {
      this.layout.addCol(row, col, new Wall());

      if (row == this.height - 1 && col == this.width - 1) {
        this.choices[Math.floor(Math.random() * 2)].call(this, row, col, this.door)
      }
    } else {
      this.layout.addCol(row, col, new Floor());

      if (row == 1 && col == 1) {
        this.choices[Math.floor(Math.random() * 2)].call(this, row, col, this.door)
      } else if (row == 1) {
        this.choices[1].call(this, row, col);
      } else if (col == 1) {
        this.choices[0].call(this, row, col);
      } else {
        this.choices[Math.floor(Math.random() * 2)].call(this, row, col)
      }
    }

    this.steps.push(this.layout.clone());
  }

  draw(ctx) {
    var size = this.size;

    this.steps.forEach((layout, index) => {
      setTimeout(() => {
        ctx.clearRect(0, 0, this.width * size, this.height * size)
        layout.draw(ctx, size)
      }, this.timeout * index)
    }, this)
  }
}

export default BinaryTreeMaze;