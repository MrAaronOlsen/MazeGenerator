import Maze from './Maze.js'
import Grid from '../core/Grid.js'
import Cell from '../cells/CellPoint.js'
import Random from '../core/Random.js'
import Point from '../core/Vector.js'

class RecursiveBacktrack extends Maze {
  constructor() {
    super();
  }

  build() {
    this.grid = new Grid(this.getMazeWidth(), this.getMazeHeight());

    this.buildWalls();
    this.cutMaze(this.getRandomStartingPoint());
    this.buildDoors();
  }

  cutMaze(point) {
    let randDirs = Random.shuffle(this.dirs)
    let gridPoint = this.getDisplayPoint(point);

    this.grid.set(point, 1);

    this.addStep([new Cell(gridPoint, Cell.fog())]);

    randDirs.forEach(dir => {
      let nextPoint = point.plus(dir);

      if (this.isInsideMaze(nextPoint) && this.grid.isEmpty(nextPoint)) {
        this.addStep([new Cell(gridPoint.plus(dir), Cell.fog())]);
        this.cutMaze(nextPoint)

        this.addStep([new Cell(gridPoint.plus(dir), Cell.floor())]);
      }
    }, this)

    this.addStep([new Cell(gridPoint, Cell.floor())]);
  }
}

export default RecursiveBacktrack;