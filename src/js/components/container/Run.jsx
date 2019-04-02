import React, { Component } from "react";
import ReactDOM from "react-dom";

import Canvas from "../presentational/Canvas.jsx";
import BinaryTreeMaze from "../lib/BinaryTreeMaze.js";

import './run.scss'

const mazeSize = 23
const canvasWidth = "598";
const canvasHeight = "598";

class Run extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    this.binaryTreeMaze = new BinaryTreeMaze(mazeSize, mazeSize, canvasWidth / mazeSize);
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
        <Canvas name="canvas" width={canvasWidth} height={canvasHeight} ref={this.canvasRef}/>
      </div>
    );
  }
}

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<Run />, wrapper) : false;