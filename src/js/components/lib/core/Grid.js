class Grid {
  constructor(width, height) {
    this.grid = new Array(height).fill(null).map(() => new Array(width).fill(null));
  }

  get(point) {
    return this.grid[point.y][point.x];
  }

  equals(point, value) {
    return this.get(point) == value;
  }

  isEmpty(point) {
    return this.get(point) == null;
  }

  set(point, value) {
    this.grid[point.y][point.x] = value;
  }
}

export default Grid;