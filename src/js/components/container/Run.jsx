import React, { Component } from "react";
import ReactDOM from "react-dom";

import Canvas from "../presentational/Canvas.jsx";
import BinaryTreeMaze from "../lib/mazes/BinaryTreeMaze.js";

import './run.scss'

class Run extends Component {
  constructor(props) {
    super(props);

    this.state = this.getAdjustedMazeSize(27)

    this.canvasRef = React.createRef();
    this.binaryTreeMaze = new BinaryTreeMaze(this.state.size, this.state.size, this.state.width / this.state.size);
  }

  getAdjustedMazeSize(size) {
    if (size % 2 == 0 || size < 5) {
      throw "Map size must be an odd number and greater than 5"
    }

    var width = 600 - (600 % size);
    var height = 600 - (600 % size);

    return {
      size: size,
      width: width,
      height: height
    }
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    this.ctx = canvas.getContext("2d");

    this.drawStatic(this.ctx);
    // this.loop();
  }

  drawStatic(ctx) {
    this.binaryTreeMaze.draw(ctx)
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
      <div id='main-window'>
        <Canvas name="canvas" width={this.state.width} height={this.state.height} ref={this.canvasRef}/>
      </div>
    );
  }
}

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<Run />, wrapper) : false;