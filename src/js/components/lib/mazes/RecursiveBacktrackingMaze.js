import Maze from './Maze.js'
import Cell from '../cells/Cell.js'
import Random from '../core/Random.js'

class RecursiveBacktrackingMaze extends Maze {
  constructor() {
    super();

    this.mazeMap = this.buildMap();
  }

  build() {
    this.buildWalls();
    this.cutMaze();
  }

  cutMaze(row, col) {

  }

  isInsideMaze(x, y) {

  }
}

export default RecursiveBacktrackingMaze;