class Fog {
  constructor() {
    if(!!Fog.instance) {
      return Fog.instance;
    }

    Fog.instance = this;
    return this;
  }

  draw(ctx, x, y, size) {
    ctx.beginPath();

    ctx.fillStyle = "rgba(190, 186, 180, 1)";
    ctx.fillRect(x, y, size, size);

    ctx.closePath();
  }
}

export default Fog;