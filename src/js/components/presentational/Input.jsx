import React, { Component } from "react";
import PropTypes from "prop-types";

class Input extends Component {

  render() {
    return (
      <input className={this.props.class}
        type="text"
        data-key={this.props.dataKey}
        value={this.props.value}
        onChange={this.props.handleInput} />
    )
  }
}

Input.propTypes = {
  handleInput: PropTypes.func.isRequired,
  dataKey: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  class: PropTypes.string
};

export default Input;