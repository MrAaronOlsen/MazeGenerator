import React, { Component } from "react";
import Input from "../presentational/Input.jsx";
import Button from "../presentational/Button.jsx";
import List from "../presentational/List.jsx";

import './menu.scss'

export default class Menu extends Component {

  render() {
    return (
      <div className="menu">
        <div className="menu-row">
          <List elements={this.props.mazeElements} handleClick={this.props.handleInput} />
        </div>

        <div className="menu-row">
          <span className="menu-title">Size</span>
          <Input class="input" dataKey="mazeSize" value={this.props.mazeSize} handleInput={this.props.handleInput} />
        </div>

        <div className="menu-row">
          <span className="menu-title">Timeout</span>
          <Input class="input" dataKey="timeout" value={this.props.timeout} handleInput={this.props.handleInput} />
        </div>

        <div className="menu-row">
          <Button class="menu-button" dataKey="buildMaze" handleClick={this.props.handleCall} displayText="Build" />
        </div>
      </div>
    )
  }
}