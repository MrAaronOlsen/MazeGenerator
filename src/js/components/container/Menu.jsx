import React, { Component } from "react";

import './menu.scss'

export default class Menu extends Component {

  render() {
    return (
      <div className="menu">
        <div className="menu-row">
          <span className="menu-title">Size</span>
          <input type="text" data-key="mazeSize" value={this.props.mazeSize} onChange={this.props.handleInput} />
        </div>

        <div className="menu-row">
          <span className="menu-title">Timeout</span>
          <input type="text" data-key="timeout" value={this.props.timeout} onChange={this.props.handleInput} />
        </div>

        <div className="menu-row">
          <button className="menu-button" data-key="buildMaze" onClick={this.props.handleCall}>Build</button>
        </div>
      </div>
    )
  }
}