import React, { Component } from "react";
import ReactDOM from "react-dom";

import Canvas from "../presentational/Canvas.jsx";
import BinaryTreeMaze from "../lib/mazes/BinaryTreeMaze.js";

import './run.scss'

export default class Run extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    this.state = this.getCalculatedState(this.props.initialSize, this.props.initialTimeout)

    this.props.handleState("buildMaze", this.build.bind(this))
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    this.ctx = canvas.getContext("2d");

    this.build(this.state.size, this.state.timeout)
  }

  getCalculatedState(size, timeout) {
    if (size % 2 == 0 || size < 5) {
      throw "Map size must be an odd number and greater than 5"
    }

    var width = 600 - (600 % size);
    var height = 600 - (600 % size);
    var cellWidth = width / size

    return {
      size: size,
      width: width,
      height: height,
      cellWidth: cellWidth,
      timeout: timeout
    }
  }

  getNewMaze(size, cellWidth, timeout) {
    return new BinaryTreeMaze(size, size, cellWidth, timeout)
  }

  build(size, timeout) {
    if (!!this.maze) {
      this.maze.stop();
    }

    var preState = this.getCalculatedState(size, timeout);

    this.maze = this.getNewMaze(preState.size, preState.cellWidth, preState.timeout);
    this.setState(preState);

    this.ctx.clearRect(0, 0, this.state.width, this.state.height);
    this.maze.draw(this.ctx)
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