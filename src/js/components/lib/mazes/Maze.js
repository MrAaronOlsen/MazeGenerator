import Cell from '../cells/Cell.js'
import Random from '../core/Random.js'
import Vect from '../core/Vector.js'

class Maze {
  constructor() {
    this.steps = [];
    this.timeoutIds = [];

    this.singlePoint = new Vect(1, 1);
  }

  set(mazeSize, gridSize, cellSize, timeout) {
    this.mazeSize = mazeSize;
    this.gridSize = gridSize;
    this.cellSize = cellSize;
    this.timeout = timeout;

    this.center = (gridSize / 2) * this.cellSize
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
    return this.mazeSize;
  }

  getMazeWidth() {
    return this.mazeSize;
  }

  getGridHeight() {
    return this.gridSize;
  }

  getGridWidth() {
    return this.gridSize;
  }

  getRandomStartingPoint() {
    return new Vect(Random.get(this.getMazeWidth() - 1), Random.get(this.getMazeHeight() - 1))
  }

  // Builds a 2d array map of maze cells.
  buildMap() {
    let height = this.getMazeHeight();
    let width = this.getMazeWidth();

    return new Array(height).fill(null).map(() => new Array(width).fill(null));
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

  // Returns true if both x and y are within the bounds of the mazeMap;
  isInsideMaze(point) {
    return point.x >= 0 && point.x < this.getMazeWidth() && point.y >= 0 && point.y < this.getMazeHeight();
  }

  // Converts a mazeMap point to a mazeGrid point for drawing
  getGridPoint(point) {
    return point.times(2).plus(this.singlePoint)
  }
}

export default Maze;