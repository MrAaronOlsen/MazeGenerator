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

    ctx.fillStyle = "rgba(112, 153, 77, 1)";
    ctx.fillRect(x, y, size, size);

    ctx.closePath();
  }
}

export default Door;