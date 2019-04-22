import Cell from '../cells/Cell.js'
import Random from '../core/Random.js'

class BinaryTreeMaze {
  constructor() {
    this.steps = [];
    this.timeoutIds = [];

    this.choices = [
      function(col, row, type) { return new Cell(col, row - 1, type.call()) },
      function(col, row, type) { return new Cell(col - 1, row, type.call()) }
    ];
  }

  set(width, height, cellSize, timeout) {
    this.mazeWidth = width;
    this.mazeHeight = height;
    this.cellSize = cellSize;
    this.timeout = timeout;
  }

  build() {
    for (let row = 0; row < this.mazeHeight; row++) {
      for (let col = 0; col < this.mazeWidth; col++) {
        this.buildCells(row, col);
      }
    }
  }

  buildCells(row, col) {
    var cells = [];

    // This algorithim treats walls as cells, rather than lines between cells
    // Because of this we set every other row and col as a wall
    if (row % 2 == 0 || col % 2 == 0) {
      cells.push(new Cell(col, row, Cell.wall()));

      // Set the door if this is the last cell being set
      if (row == this.mazeHeight - 1 && col == this.mazeWidth - 1) {
        cells.push(this.getRandomChoice(col, row, Cell.door))
      }
    } else {
      // Always make current cell a floor.
      cells.push(new Cell(col, row, Cell.floor()));

      // Then cut back through the wall.
      if (row == 1 && col == 1) {
        // Place a door if this is the first floor cell
        cells.push(this.getRandomChoice(col, row, Cell.door));
      } else if (row == 1) {
        // If we're against the top row always cut back
        cells.push(this.choices[1].call(this, col, row, Cell.floor));
      } else if (col == 1) {
        // If we're against the left col always cut up
        cells.push(this.choices[0].call(this, col, row, Cell.floor));
      } else {
        // Otherwise can randomly choose to cut up or back
        cells.push(this.getRandomChoice(col, row, Cell.floor));
      }
    }

    // Adds the new cells to the draw steps
    this.steps.push(cells);
  }

  getRandomChoice(col, row, type) {
    return this.choices[Random.get(2)].call(this, col, row, type)
  }

  // Clears all currenly uncalled timeouts
  stop() {
    this.timeoutIds.forEach(timeoutId => {
      window.clearTimeout(timeoutId);
    })

    this.steps = [];
  }

  draw(ctx) {
    var cellSize = this.cellSize;

    this.steps.forEach((cells, index) => {
      let timeoutId = setTimeout(() => {
        cells.forEach((cell => {
          cell.draw(ctx, cellSize)
        }))
      }, this.timeout * index)

      // Store the timeout id in case we want to stop the maze before it's done drawing
      this.timeoutIds.push(timeoutId);
    }, this)
  }
}

export default BinaryTreeMaze;