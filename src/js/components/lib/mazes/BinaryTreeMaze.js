import Layout from '../core/Layout.js'

import Cell from '../cells/Cell.js'

class BinaryTreeMaze {
  constructor(width, height, size, timeout) {
    this.size = size;
    this.width = width;
    this.height = height;

    this.steps = [];

    this.timeout = timeout;
    this.timeoutIds = [];

    this.choices = [
      function(row, index, type = Cell.floor) { return new Cell(row - 1, index, type.call()) },
      function(row, index, type = Cell.floor) { return new Cell(row, index - 1, type.call()) }
    ];

    this.getRandom = () => { return Math.floor(Math.random() * 2) }

    this.build();
  }

  build() {
    for (let row = 0; row < this.height; row++) {
      this.setRow(row);
    }
  }

  setRow(row) {
    for (let col = 0; col < this.width; col++) {
      this.setCol(row, col);
    }
  }

  setCol(row, col) {
    var cells = [];

    if (row % 2 == 0 || col % 2 == 0) {
      let wall = new Cell(row, col, Cell.wall());
      cells.push(wall);

      if (row == this.height - 1 && col == this.width - 1) {
        let door = this.choices[this.getRandom()].call(this, row, col, Cell.door)
        cells.push(door)
      }
    } else {
      let cell1 = new Cell(row, col, Cell.floor());
      let cell2;

      if (row == 1 && col == 1) {
        cell2 = this.choices[this.getRandom()].call(this, row, col, Cell.door)
      } else if (row == 1) {
        cell2 = this.choices[1].call(this, row, col);
      } else if (col == 1) {
        cell2 = this.choices[0].call(this, row, col);
      } else {
        cell2 = this.choices[this.getRandom()].call(this, row, col)
      }

      cells.push(cell1)
      cells.push(cell2)
    }

    this.steps.push(cells);
  }

  stop() {
    this.timeoutIds.forEach(timeoutId => {
      window.clearTimeout(timeoutId);
    })

    this.steps = [];
  }

  draw(ctx) {
    var size = this.size;

    this.steps.forEach((cells, index) => {
      let timeoutId = setTimeout(() => {
        cells.forEach((cell => {
          cell.draw(ctx, size)
        }))
      }, this.timeout * index)

      this.timeoutIds.push(timeoutId);
    }, this)
  }
}

export default BinaryTreeMaze;