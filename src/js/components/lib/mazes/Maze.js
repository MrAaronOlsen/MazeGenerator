import Cell from '../cells/Cell.js'

class Maze {
  constructor() {
    this.steps = [];
    this.timeoutIds = [];
  }

  set(gridWidth, gridHeight, cellSize, timeout) {
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.cellSize = cellSize;
    this.timeout = timeout;

    this.center = (gridWidth / 2) * this.cellSize
  }

  addStep(step) {
    this.steps.push(step);
  }

  getSteps() {
    return this.steps;
  }

  clearSteps() {
    this.steps = [];
  }

  getMazeHeight() {
    return this.mazeHeight;
  }

  getMazeWidth() {
    return this.mazeWidth;
  }

  getGridHeight() {
    return this.gridHeight;
  }

  getGridWidth() {
    return this.gridWidth;
  }

  // Builds a 2d array map of maze cells
  buildMap() {
    return new Array(this.getMazeHeight()).fill(null).map(() => new Array(this.getMazeWidth()).fill(null));
  }


  // Creates a grid of walls.
  buildWalls() {
    var step = [];

    for (let row = 0; row < this.getGridHeight(); row++) {

      if (row % 2 == 0) {
        for (let col = 0; col < this.getGridWidth(); col++) {
          step.push(new Cell(col, row, Cell.wall()));
        }
      } else {
        for (let col = 0; col < this.getGridWidth(); col += 2) {
          step.push(new Cell(col, row, Cell.wall()));
        }
      }
    }

    this.addStep(step);
  }

  // Clears all currenly stored timeouts
  stop() {
    this.timeoutIds.forEach(timeoutId => {
      window.clearTimeout(timeoutId);
    })

    this.clearSteps();
  }

  // Draws maze from the steps setting timeout for each step
  draw(ctx) {
    var cellSize = this.cellSize;

    this.getSteps().forEach((cells, index) => {
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