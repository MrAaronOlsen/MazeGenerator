import Maze from './Maze.js'
import Cell from '../cells/Cell.js'
import Random from '../core/Random.js'
import Vector from '../core/Vector.js'

class RecursiveBacktrackingMaze extends Maze {
  constructor() {
    super();

    this.dirs = [new Vector(1, 0), new Vector(-1, 0), new Vector(0, 1), new Vector(0, -1)]
  }

  build() {
    this.mazeMap = this.buildMap();

    this.buildWalls();
    this.cutMaze(0, 0);
  }

  cutMaze(x, y) {
    let randDirs = Random.shuffle(this.dirs)
    let gridX = (x * 2) + 1;
    let gridY = (y * 2) + 1;

    this.mazeMap[y][x] = 1;

    this.addStep([new Cell(gridX, gridY, Cell.fog())]);

    randDirs.forEach(dir => {
      let nextX = dir.x + x;
      let nextY = dir.y + y;

      if (this.isInsideMaze(nextX, nextY) && this.mazeMap[nextY][nextX] == null) {
        this.addStep([new Cell(gridX + dir.x, gridY + dir.y, Cell.fog())]);
        this.cutMaze(nextX, nextY)

        this.addStep([new Cell(gridX + dir.x, gridY + dir.y, Cell.floor())]);
      }
    }, this)

    this.addStep([new Cell(gridX, gridY, Cell.floor())]);
  }

  isInsideMaze(x, y) {
    return x >= 0 && x < this.getMazeWidth() && y >= 0 && y < this.getMazeHeight();
  }
}

export default RecursiveBacktrackingMaze;