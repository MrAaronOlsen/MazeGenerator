import Cell from '../cells/Cell.js'
import Random from '../core/Random.js'

class SideWinderMaze {
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
    this.buildWalls();
    this.cutMaze();
    this.placeDoors();
  }

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

  cutMaze() {
    for (let row = 1; row < this.mazeHeight; row+=2) {
      this.cutRow(row)
    }
  }

  cutRow(row) {
    var set = [];

    for (let col = 1; col < this.mazeWidth; col+=2) {
      let drawSteps = [];

      // We always make the current cell a floor
      drawSteps.push(new Cell(col, row, Cell.floor()))

      // Add this col to the set
      set.push(col);

      // If this isn't first row and is either the last cell or a coin flip is heads...
      if (row > 1 && (col + 2 == this.mazeWidth || Random.flipCoin().heads)) {

        // Select a cell from the current set to carve north from
        var index = Random.get(set.length);
        var cell = set[index];

        // Cut a path north from the selected cell
        drawSteps.push(new Cell(cell, row - 1, Cell.floor()))

        // Start a new set
        set = [];

        // As long as this isn't the last col keep cutting the set
      } else if (col + 2 != this.mazeWidth){
        drawSteps.push(new Cell(col + 1, row, Cell.floor()))
      }

      // Adds the new cells to the draw steps
      this.steps.push(drawSteps);
    }
  }

  placeDoors() {
    this.steps.push([new Cell(1, 0, Cell.door())])
    this.steps.push([new Cell(this.mazeWidth - 2, this.mazeHeight - 1, Cell.door())])
  }

  getRandomFloorCell() {
    var potentials = [];

    for (let col = 1; col < this.mazeWidth; col+=2) {
      potentials.push(col);
    }

    return potentials[Random.get(potentials.length)]
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

export default SideWinderMaze;