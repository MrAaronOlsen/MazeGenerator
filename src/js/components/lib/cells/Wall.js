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

    ctx.fillStyle = "rgba(111, 109, 109, 1)";
    ctx.fillRect(x, y, size, size);

    ctx.closePath();
  }
}

export default Wall;