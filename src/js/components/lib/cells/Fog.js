import Colors from '../core/Colors.js'

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

    ctx.fillStyle = Colors.GREY;
    ctx.fillRect(x, y, size, size);

    ctx.closePath();
  }
}

export default Fog;