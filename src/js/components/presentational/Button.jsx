import React, { Component } from "react";
import PropTypes from "prop-types";

class Button extends Component {

  render() {
    return (
      <button className={this.props.class}
        type="text"
        data-key={this.props.dataKey}
        onClick={this.props.handleClick} >{this.props.displayText}</button>
    )
  }
}

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  dataKey: PropTypes.string.isRequired,
  class: PropTypes.string,
  displayText: PropTypes.string
};

export default Button;