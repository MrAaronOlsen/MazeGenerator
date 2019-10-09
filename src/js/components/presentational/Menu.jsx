import React, { Component } from "react";
import PropTypes from "prop-types";

import Input from "../presentational/Input.jsx";
import Button from "../presentational/Button.jsx";
import List from "../presentational/List.jsx";

import './menu.scss'

class Menu extends Component {

  render() {
    return (
      <div className="menu">
        <div className="menu-box">
          <div className="menu-row">
            <List elements={this.props.mazeList}
              handleClick={this.props.handleClick} />
          </div>

          <div className="menu-row">
            <span className="menu-title">Size</span>
            <Input class="input"
              type="number"
              dataKey="mazeSize"
              value={this.props.mazeSize}
              handleInput={this.props.handleInput} />
          </div>

          <div className="menu-row">
            <span className="menu-title">Timeout</span>
            <Input class="input"
              type="number"
              dataKey="timeout"
              value={this.props.timeout}
              handleInput={this.props.handleInput} />
          </div>

          <div className="menu-row">
            <Button class="menu-button"
              dataKey="buildMaze"
              handleClick={this.props.handleCall}
              displayText="Build" />
          </div>
        </div>
      </div>
    )
  }
}

Menu.propTypes = {
  handleClick: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleCall: PropTypes.func.isRequired,
  mazeList: PropTypes.array,
  mazeSize: PropTypes.number,
  timeout: PropTypes.number,
};

export default Menu;