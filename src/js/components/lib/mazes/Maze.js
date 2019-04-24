import Cell from '../cells/Cell.js'

class Maze {
  constructor() {
    this.steps = [];
    this.timeoutIds = [];
  }

  set(width, height, cellSize, timeout) {
    this.mazeWidth = width;
    this.mazeHeight = height;
    this.cellSize = cellSize;
    this.timeout = timeout;

    this.center = (width / 2) * this.cellSize
  }

  // Creates a grid of walls.
  buildWalls() {
    var cells = [];

    for (let row = 0; row< this.mazeHeight; row++) {

      if (row % 2 == 0) {
        for (let col = 0; col < this.mazeWidth; col++) {
          cells.push(new Cell(col, row, Cell.wall()));
        }
      } else {
        for (let col = 0; col < this.mazeWidth; col+=2) {
          cells.push(new Cell(col, row, Cell.wall()));
        }
      }
    }

    this.steps.push(cells);
  }

  // Clears all currenly stored timeouts
  stop() {
    this.timeoutIds.forEach(timeoutId => {
      window.clearTimeout(timeoutId);
    })

    this.steps = [];
  }

  // Draws maze from the steps setting timeout for each step
  draw(ctx) {
    var cellSize = this.cellSize;

    this.steps.forEach((cells, index) => {
      let timeoutId = setTimeout(() => {
        cells.forEach((cell => {
          cell.draw(ctx, cellSize)
        }))
      }, this.timeout * index)

      // Track timeouts
      this.timeoutIds.push(timeoutId);
    }, this)
  }
}

export default Maze;