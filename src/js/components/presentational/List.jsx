import React, { Component } from "react";
import PropTypes from "prop-types";

class List extends Component {

  render() {
    return (
      <div className="list">
        {
          this.props.elements.map((element, index) => {
            return <ListRow key={index} element={element} handleClick={this.props.handleClick}/>
          })
        }
      </div>
    )
  }
}

class ListRow extends Component {

  render() {
    return(
      <div className="list-row"
        data-key={this.props.element.key}
        data-value={this.props.element.value}
        onClick={this.props.handleClick} >

        {this.props.element.text}
      </div>
    )
  }
}

List.propTypes = {
  elements: PropTypes.array.isRequired,
  handleClick: PropTypes.func
};

ListRow.propTypes = {
  element: PropTypes.object.isRequired,
  handleClick: PropTypes.func
};

export default List;