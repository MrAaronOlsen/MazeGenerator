import Cell from '../cells/Cell.js'
import Random from '../core/Random.js'
import Point from '../core/Vector.js'

class Maze {
  constructor() {
    this.steps = [];
    this.timeoutIds = [];

    this.singlePoint = new Point(1, 1);
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
    return new Point(Random.get(this.getMazeWidth() - 1), Random.get(this.getMazeHeight() - 1))
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
  getDisplayPoint(point) {
    return point.times(2).plus(this.singlePoint)
  }

  buildDoors() {
    var start;
    var end;

    var startSide = Random.get(2);
    if (startSide == 1) {
      start = this.getDisplayPoint(new Point(Random.get(this.getMazeWidth() - 1), 0));
      start.sub(new Point(0, 1));
    } else {
      start = this.getDisplayPoint(new Point(0, Random.get(this.getMazeHeight() - 1)));
      start.sub(new Point(1, 0));
    }

    this.addStep([new Cell(start.x, start.y, Cell.door())])

    var endSide = Random.get(2);
    if (endSide == 1) {
      end = this.getDisplayPoint(new Point(Random.get(this.getMazeWidth() - 1), this.getMazeHeight() - 1));
      end.add(new Point(0, 1));
    } else {
      end = this.getDisplayPoint(new Point(this.getMazeWidth() - 1, Random.get(this.getMazeHeight() - 1)));
      end.add(new Point(1, 0));
    }

    this.addStep([new Cell(end.x, end.y, Cell.door())])
  }
}

export default Maze;