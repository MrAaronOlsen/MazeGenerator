import React, { Component } from "react";
import ReactDOM from "react-dom";

import Canvas from "../presentational/Canvas.jsx";

import SizeCalculator from "../lib/core/SizeCalculator.js";
import Mazes from "../lib/mazes/Mazes.js"

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

  componentDidMount() {
    const canvas = this.canvasRef.current;
    this.ctx = canvas.getContext("2d");
  }

  build(maze, size, timeout) {
    if (!!this.maze) { this.maze.stop() }

    var state = SizeCalculator.get(size, timeout);

    this.maze = Mazes.get(maze);
    this.maze.set(state.mazeSize, state.gridSize, state.cellWidth, state.timeout);

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