import Maze from './Maze.js'
import Grid from './Grid.js'
import Cell from '../cells/CellPoint.js'
import Random from '../core/Random.js'
import Point from '../core/Vector.js'

class Prims extends Maze {
  constructor() {
    super();

    this.dirs = [new Point(1, 0), new Point(-1, 0), new Point(0, 1), new Point(0, -1)];
    this.frontier = [];
  }

  build() {
    this.grid = new Grid(this.getMazeWidth(), this.getMazeHeight());

    this.buildWalls();
    this.cutMaze(this.getRandomStartingPoint());
    this.buildDoors();
  }

  cutMaze(start) {
    this.mark(start);

    while (this.frontier.length > 0) {
      let next = this.frontier.splice(Random.get(this.frontier.length - 1), 1)[0]
      this.mark(next);
    }
  }

  mark(point) {
    this.grid.set(point, 0);

    let gridPoint = this.getDisplayPoint(point);
    let step = [new Cell(gridPoint, Cell.floor())];

    this.dirs.forEach(dir => {
      let dirPoint = point.plus(dir);

      if (this.addFrontier(dirPoint)) {
        let frontierPoint = this.getDisplayPoint(dirPoint);
        let floorPoint = gridPoint.plus(dir);

        step.push(new Cell(floorPoint, Cell.floor()));
        step.push(new Cell(frontierPoint, Cell.door()));
      }
    }, this)

    this.addStep(step);
  }

  addFrontier(point) {
    if (this.isInsideMaze(point) && this.grid.isEmpty(point)) {
      this.grid.set(point, 1);
      this.frontier.push(point)

      return true;
    }

    return false;
  }
}

export default Prims;