import Colors from '../core/Colors.js'

class Door {
  constructor() {
    if(!!Door.instance) {
      return Door.instance;
    }

    Door.instance = this;
    return this;
  }

  draw(ctx, x, y, size) {
    ctx.beginPath();

    ctx.fillStyle = Colors.GREEN;
    ctx.fillRect(x, y, size, size);

    ctx.closePath();
  }
}

export default Door;