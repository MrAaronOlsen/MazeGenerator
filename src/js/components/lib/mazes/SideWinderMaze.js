import Maze from './Maze.js'
import Cell from '../cells/Cell.js'
import Random from '../core/Random.js'

class SideWinderMaze extends Maze {
  constructor() {
    super();

    this.choices = [
      function(col, row, type) { return new Cell(col, row - 1, type.call()) },
      function(col, row, type) { return new Cell(col - 1, row, type.call()) }
    ];
  }

  build() {
    this.buildWalls();
    this.cutMaze();
    this.placeDoors();
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
}

export default SideWinderMaze;