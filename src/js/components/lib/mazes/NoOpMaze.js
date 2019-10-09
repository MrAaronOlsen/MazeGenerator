import Maze from './Maze.js'
import Cell from '../cells/Cell.js'
import Random from '../core/Random.js'

class NoOpMaze extends Maze {
  constructor() {
    super();
  }

  build() {
    // do nothing
  }

  draw(ctx) {
    ctx.beginPath();

    ctx.font = '24px serif';
    ctx.textAlign = "center"
    ctx.fillText('Please select a Maze', this.center, this.center);

    ctx.closePath();
  }
}

export default NoOpMaze;