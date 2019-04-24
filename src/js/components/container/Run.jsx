import React, { Component } from "react";
import ReactDOM from "react-dom";

import Canvas from "../presentational/Canvas.jsx";
import BinaryTreeMaze from "../lib/mazes/BinaryTreeMaze.js";
import SideWinderMaze from "../lib/mazes/SideWinderMaze.js";
import NoOpMaze from "../lib/mazes/NoOpMaze.js";

import './run.scss'

class Run extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 600,
      height: 600
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
      default:
        return new NoOpMaze();
    }
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    this.ctx = canvas.getContext("2d");
  }

  // Tries to find a whole number render size of the Maze to prevent funny rendering anomalies
  getCalculatedState(size, timeout) {
    // Maze sizes must be even numbers and cannot be less than 5 or greater than 501
    if (size % 2 == 0 || size < 5 || size > 501) {
      throw "Map size must be an odd number and greater than 5"
    }

    // Aim for 600px
    var width = 600;

    // Increase size until we get no remainder
    while (width % size != 0) {
      width++;

      // If width gets too big reverse
      if (width > 620) {
        width = 599;

        // Decrease size until we get no remainder
        while (width % size != 0) {
          width--;

          // If we still haven't found something fall back to gaurenteed result
          if (width < 580) {

            // Will find something that fits, but could be undesirable size (aka, really small)
            width = 600 - (600 % size);
            break;
          }
        }
      }
    }

    // Cell Width should always be a whole number now
    var cellWidth = width / size;

    // Returns a state object
    return {
      size: size,
      width: width,
      height: width,
      cellWidth: cellWidth,
      timeout: timeout
    }
  }

  build(maze, size, timeout) {
    if (!!this.maze) { this.maze.stop() }

    var state = this.getCalculatedState(size, timeout);

    this.maze = this.getMaze(maze);
    this.maze.set(state.size, state.size, state.cellWidth, state.timeout);

    this.setState(state);

    this.ctx.clearRect(0, 0, this.state.width, this.state.height);
    this.maze.build()
    this.maze.draw(this.ctx);
  }

  render() {
    return (
      <div id='canvas-wrapper'>
        <Canvas name="canvas" width={this.state.width} height={this.state.height} ref={this.canvasRef}/>
      </div>
    );
  }
}

export default Run;