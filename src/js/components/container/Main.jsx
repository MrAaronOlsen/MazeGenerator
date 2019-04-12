import React, { Component } from "react";
import ReactDOM from "react-dom";

import Run from './Run.jsx'
import Menu from './Menu.jsx'
import "./main.scss"

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mazeSize: 27,
      timeout: 25,
      maze: "Tree"
    };

    this.methods = {
      buildMaze: function() { this.state.buildMaze(this.state.maze, this.state.mazeSize, this.state.timeout) }
    }

    this.handleState = this.handleState.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleCall = this.handleCall.bind(this);
  }

  handleState(key, value) {
    this.setState({
      [key]: value
    })
  }

  handleInput(event) {
    var value = event.target.value;

    if (value == undefined) {
      value = event.target.dataset.value
    }

    var key = event.target.dataset.key;

    this.setState({
      [key]: value
    })
  }

  handleCall(event) {
    var method = event.target.dataset.key;
    this.methods[method].call(this)
  }

  getMazeElements() {
    var elements = [];
    elements.push({text: "Binary Tree Maze", key: "maze", value: "Tree"})
    elements.push({text: "Sidewinder Maze", key: "maze", value: "Sidewinder"})

    return elements;
  }

  render() {
    return (
      <div id="main-window">
        <Menu
          handleInput={this.handleInput}
          handleCall={this.handleCall}
          mazeElements={this.getMazeElements()}
          mazeSize={this.state.mazeSize}
          timeout={this.state.timeout} />

        <Run handleState={this.handleState}
          initialSize={this.state.mazeSize}
          initialTimeout={this.state.timeout} />
      </div>
    )
  }
}

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<Main />, wrapper) : false;