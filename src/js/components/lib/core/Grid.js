import Vector from './Vector.js';
import Edge from './Edge.js';

class Grid {
  constructor(width, height) {
    this.height = height;
    this.width = width;
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

  getAllEdges() {
    var edges = [];

    for (let row = 0; row < height - 1; row++) {
      for (let col = 0; col < width - 1; col++) {
        edges.push(new Edge(row, col, row, col + 1));
        edges.push(new Edge(row, col, row + 1, col));
      }
    }

    return edges;
  }
}

export default Grid;