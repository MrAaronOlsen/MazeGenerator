import Wall from '../cells/Wall.js';
import Floor from '../cells/Floor.js';
import Door from '../cells/Door.js';

class Cell {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  draw(ctx, size) {
    var x = this.x * size;
    var y = this.y * size;

    ctx.clearRect(x, y, size, size)
    this.type.draw(ctx, x, y, size)
  }

  static wall() {
    return new Wall();
  }

  static floor() {
    return new Floor();
  }

  static door() {
    return new Door();
  }
}

export default Cell;