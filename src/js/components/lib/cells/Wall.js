import Colors from '../core/Colors.js'

class Wall {
  constructor() {
    if(!!Wall.instance) {
      return Wall.instance;
    }

    Wall.instance = this;
    return this;
  }

  draw(ctx, x, y, size) {
    ctx.beginPath();

    ctx.fillStyle = Colors.DARK_GREY;
    ctx.fillRect(x, y, size, size);

    ctx.closePath();
  }
}

export default Wall;