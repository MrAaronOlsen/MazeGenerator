import React, { Component } from "react";
import ReactDOM from "react-dom";

import Canvas from "../presentational/Canvas.jsx";

import './run.scss'

const canvasWidth = "600";
const canvasHeight = "600";

class Run extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    this.ctx = canvas.getContext("2d");

    this.drawStatic(this.ctx);
    this.loop();
  }

  drawStatic(ctx) {
    ctx.beginPath();
    ctx.font = '48px serif';
    ctx.textAlign = 'center';
    ctx.fillText("Ready to Rock!", canvasWidth/2, canvasHeight/2);
    ctx.closePath();
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