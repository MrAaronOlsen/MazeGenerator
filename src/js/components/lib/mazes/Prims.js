import Maze from './Maze.js'
import Cell from '../cells/Cell.js'
import Random from '../core/Random.js'
import Vector from '../core/Vector.js'

class Prims extends Maze {
  constructor() {
    super();

    this.dirs = [new Vector(1, 0), new Vector(-1, 0), new Vector(0, 1), new Vector(0, -1)]
    this.frontier = [];
  }

  build() {
    this.mazeMap = this.buildMap();

    this.buildWalls();
    this.cutMaze(this.getRandomStartingPoint());
  }

  cutMaze(point) {
    this.mark(point.x, point.y, this.mazeMap, this.frontier);

    while (this.frontier.length > 0) {
      let next = this.frontier.splice(Random.get(this.frontier.length - 1), 1)[0]

      this.mark(next[0], next[1], this.mazeMap, this.frontier);
    }
  }

  mark(x, y, grid, frontier) {
    let gridX = (x * 2) + 1;
    let gridY = (y * 2) + 1;

    grid[y][x] = 0;

    let step = []
    step.push(new Cell(gridX, gridY, Cell.floor()));

    this.dirs.forEach(dir => {
      let dirX = x + dir.x;
      let dirY = y + dir.y;

      if (this.addFrontier(dirX, dirY, grid, frontier)) {
        let fogX = (dirX * 2) + 1;
        let fogY = (dirY * 2) + 1;

        let floorX = gridX + dir.x;
        let floorY = gridY + dir.y;

        step.push(new Cell(floorX, floorY, Cell.floor()));
        step.push(new Cell(fogX, fogY, Cell.door()));
      }
    }, this)

    this.addStep(step);
  }

  addFrontier(x, y, grid, frontier) {
    if (this.isInsideMaze(x, y) && grid[y][x] == null) {
      grid[y][x] = 1;
      frontier.push([x, y])

      return true;
    }

    return false;
  }

  isInsideMaze(x, y) {
    return x >= 0 && x < this.getMazeWidth() && y >= 0 && y < this.getMazeHeight();
  }
}

export default Prims;