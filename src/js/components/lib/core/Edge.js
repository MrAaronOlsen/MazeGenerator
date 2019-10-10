import Vector from './Vector.js'

class Edge {

  constructor(x1, y1, x2, y2) {
    this.node1 = new Vector(x1, y1);
    this.node2 = new Vector(x2, y2);
  }

  getNode1() {
    return this.node1;
  }

  getNode2() {
    return this.node2;
  }
}

export default Edge;