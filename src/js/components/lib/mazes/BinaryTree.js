import Maze from './Maze.js'
import Cell from '../cells/Cell.js'
import Random from '../core/Random.js'

class BinaryTree extends Maze {
  constructor() {
    super();

    this.choices = {
      up: function(col, row, type) { return new Cell(col, row - 1, type.call()) },
      back: function(col, row, type) { return new Cell(col - 1, row, type.call()) }
    };
  }

  build() {
    this.buildWalls();
    this.cutMaze();
  }

  cutMaze(row, col) {
    for (let row = 1; row < this.getGridHeight(); row+=2) {
      for (let col = 1; col < this.getGridWidth(); col+=2) {
        let step = [];

        // Always make current cell a floor
        step.push(new Cell(col, row, Cell.floor()));

        var dirs = [];
        if (row != 1) dirs.push("up");
        if (col != 1) dirs.push("back");

        // As long as we have some direction to go randomly choose one.
        if (dirs.length > 0) {
          step.push(this.choices[dirs[Random.get(dirs.length)]].call(this, col, row, Cell.floor))
        }

        // Adds the new cells to the draw steps
        this.addStep(step)
      }
    }
  }
}

export default BinaryTree;