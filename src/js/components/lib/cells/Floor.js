class Floor {
  constructor() {
    if(!!Floor.instance) {
      return Floor.instance;
    }

    Floor.instance = this;
    return this;
  }

  draw(ctx, x, y, size) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(219, 180, 127, 1)";
    ctx.rect(x, y, size, size);
    ctx.fill();
    ctx.closePath();
  }
}

export default Floor;