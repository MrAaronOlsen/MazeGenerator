import React, { Component } from "react";
import ReactDOM from "react-dom";

import Run from './Run.jsx'
import "./main.scss"

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mazeSize: 27,
      timeout: 25
    };

    this.handleState = this.handleState.bind(this);
  }

  handleState(key, value) {
    this.setState({
      [key]: value
    })
  }

  handleSizeChange(event) {
    var size = event.target.value;

    this.setState({
      mazeSize: size
    })
  }

  handleTimeoutChange(event) {
    var timeout = event.target.value;

    this.setState({
      timeout: timeout
    })
  }

  handleReRunBuild() {
    this.state.buildMaze(this.state.mazeSize, this.state.timeout)
  }

  render() {
    return (
      <div id="main-window">
        <div className="side-menu">
          Size
          <input type="text" value={this.state.mazeSize} onChange={this.handleSizeChange.bind(this)} />
          Timeout
          <input type="text" value={this.state.timeout} onChange={this.handleTimeoutChange.bind(this)} />
          Rebuild
          <button onClick={this.handleReRunBuild.bind(this)}>Build</button>
        </div>

        <Run handleState={this.handleState}
          initialSize={this.state.mazeSize}
          initialTimeout={this.state.timeout} />
      </div>
    )
  }
}

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<Main />, wrapper) : false;