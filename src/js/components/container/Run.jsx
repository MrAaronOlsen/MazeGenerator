import React, { Component } from "react";
import ReactDOM from "react-dom";

import Canvas from "../presentational/Canvas.jsx";
import BinaryTreeMaze from "../lib/mazes/BinaryTreeMaze.js";
import SideWinderMaze from "../lib/mazes/SideWinderMaze.js";

import './run.scss'

export default class Run extends Component {
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
        return null;
    }
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    this.ctx = canvas.getContext("2d");
  }

  getCalculatedState(size, timeout) {
    if (size % 2 == 0 || size < 5 || size > 501) {
      throw "Map size must be an odd number and greater than 5"
    }

    var width = 600 - (600 % size);
    var height = 600 - (600 % size);
    var cellWidth = width / size;

    return {
      size: size,
      width: width,
      height: height,
      cellWidth: cellWidth,
      timeout: timeout
    }
  }

  build(maze, size, timeout) {
    if (maze == null) {
      return
    }

    if (!!this.maze) { this.maze.stop() }

    var state = this.getCalculatedState(size, timeout);

    this.maze = this.getMaze(maze);
    this.maze.set(state.size, state.size, state.cellWidth, state.timeout);

    this.setState(state);

    this.ctx.clearRect(0, 0, this.state.width, this.state.height);
    this.maze.build()
    this.maze.draw(this.ctx);
  }

  draw(ctx) {
  }

  update() {
  }

  keyDown(key) {
  }

  loop() {
    this.draw(this.ctx);
    this.update();

    requestAnimationFrame(this.loop.bind(this));
  }

  render() {
    return (
      <div id='canvas-wrapper'>
        <Canvas name="canvas" width={this.state.width} height={this.state.height} ref={this.canvasRef}/>
      </div>
    );
  }
}