import React, { Component } from "react";
import ReactDOM from "react-dom";

import Canvas from "../presentational/Canvas.jsx";
import BinaryTreeMaze from "../lib/mazes/BinaryTreeMaze.js";
import SideWinderMaze from "../lib/mazes/SideWinderMaze.js";
import RecursiveBacktrackingMaze from "../lib/mazes/RecursiveBacktrackingMaze.js";
import NoOpMaze from "../lib/mazes/NoOpMaze.js";

import SizeCalculator from "../lib/core/SizeCalculator.js";

import './run.scss'

class Run extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pixWidth: 600,
      pixHeight: 600
    }

    this.canvasRef = React.createRef();
    this.props.handleState("buildMaze", this.build.bind(this));
  }

  getMaze(maze) {
    switch (maze) {
      case "Tree":
        return new BinaryTreeMaze();
      case "Sidewinder":
        return new SideWinderMaze();
      case "RecursiveBacktracking":
        return new RecursiveBacktrackingMaze();
      default:
        return new NoOpMaze();
    }
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    this.ctx = canvas.getContext("2d");
  }

  build(maze, size, timeout) {
    if (!!this.maze) { this.maze.stop() }

    var state = SizeCalculator.get(size, timeout);

    this.maze = this.getMaze(maze);
    this.maze.set(state.gridSize, state.gridSize, state.cellWidth, state.timeout);

    this.setState(state);

    this.ctx.clearRect(0, 0, state.pixWidth, state.pixHeight);
    this.maze.build()
    this.maze.draw(this.ctx);
  }

  render() {
    return (
      <div id='canvas-wrapper'>
        <Canvas name="canvas" width={this.state.pixWidth} height={this.state.pixHeight} ref={this.canvasRef}/>
      </div>
    );
  }
}

export default Run;