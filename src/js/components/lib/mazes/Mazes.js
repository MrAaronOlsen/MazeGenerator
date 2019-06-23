import BinaryTree from "./BinaryTree.js";
import Sidewinder from "./Sidewinder.js";
import RecursiveBacktrack from "./RecursiveBacktrack.js";
import Prims from "./Prims.js";
import NoOpMaze from "./NoOpMaze.js";

const MAZES = {
  BINARY_TREE: "BinaryTree",
  SIDEWINDER: "Sidewinder",
  RECURSIVE_BACKTRACK: "RecursiveBacktrack",
  PRIMS: "Prims"
}

class Mazes {

  static get(maze) {
    switch (maze) {
      case MAZES.BINARY_TREE:
        return new BinaryTree();
      case MAZES.SIDEWINDER:
        return new Sidewinder();
      case MAZES.RECURSIVE_BACKTRACK:
        return new RecursiveBacktrack();
      case MAZES.PRIMS:
        return new Prims();
      default:
        return new NoOpMaze();
    }
  }

  static getMenuList() {
    return [
      {text: "Binary Tree", key: "maze", value: MAZES.BINARY_TREE},
      {text: "Sidewinder", key: "maze", value: MAZES.SIDEWINDER},
      {text: "Recursive Backtrack", key: "maze", value: MAZES.RECURSIVE_BACKTRACK},
      {text: "Prims", key: "maze", value: MAZES.PRIMS}
    ];
  }
}

export default Mazes;