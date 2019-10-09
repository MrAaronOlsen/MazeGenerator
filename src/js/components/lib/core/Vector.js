class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  mult(scalar) {
    this.x *= scalar;
    this.y *= scalar;

    return this;
  }

  multVec(vector) {
    this.x *= vector.x;
    this.y *= vector.y;

    return this;
  }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;

    return this;
  }

  sub(vector) {
    this.x -= vector.x;
    this.y -= vector.y;

    return this;
  }

  plus(vector) {
    return new Vector(
      this.x + vector.x,
      this.y + vector.y
    )
  }

  minus(vector) {
    return new Vector(
      this.x - vector.x,
      this.y - vector.y
    )
  }

  times(scalar) {
    return new Vector(
      this.x * scalar,
      this.y * scalar
    )
  }

  devidedBy(scalar) {
    if (scalar == 0) {
      return this.copy()
    }

    return new Vector(
      this.x / scalar,
      this.y / scalar
    )
  }

  rotate(radian) {
    var cos = Math.cos(radian);
    var sin = Math.sin(radian);

    var nx = (this.x * cos) - (this.y * sin);
  	var ny = (this.x * sin) + (this.y * cos);

  	this.x = nx;
  	this.y = ny;

  	return this;
  }

  devidedByVect(vector) {
    var divX = (vector.x == 0) ? this.x : this.x / vector.x;
    var divY = (vector.y == 0) ? this.y : this.y / vector.y;

    return new Vector(divX, divY);
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  normal() {
    return new Vector(-this.y, this.x)
  }

  normalize() {
    var ox = this.x;

    this.x = -this.y;
    this.y = ox;

    return this;
  }

  unit() {
    var m = this.mag();
    return m === 0 ? new Vector(this.x, this.y) : new Vector(this.x / m, this.y / m);
  }

  dot(vector) {
    return (this.x * vector.x) + (this.y * vector.y)
  }

  copy() {
    return new Vector(this.x, this.y)
  }

  equals(vector) {
    return this.x == vector.x && this.y == vector.y
  }

  static average(vectors) {
    var total = vectors.map((sum, vector) => {
      sum.add(vector)
    }, new Vector())

    return total.devided(vectors.length)
  }

  toString() {
    `X: ${this.x} Y: ${this.y}`
  }
}

export default Vector;