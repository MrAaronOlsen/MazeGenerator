import React, { Component } from "react";
import PropTypes from "prop-types";

class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: this.props.default
    }
  }

  handleClick(event) {
    var value = event.target.dataset.value

    this.setState({
      selected: value
    })

    this.props.handleClick(event)
  }

  makeList() {
    return this.props.elements.map((element, index) => {
      return <ListRow
        key={index}
        element={element}
        selected={this.state.selected === element.value}
        handleClick={this.handleClick.bind(this)}/>
    })
  }

  render() {
    return (
      <div className="list">
        { this.makeList() }
      </div>
    )
  }
}

class ListRow extends Component {

  render() {
    return(
      <div className={ "list-row" + (this.props.selected ? " selected" : "") }
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
  selected: PropTypes.bool,
  handleClick: PropTypes.func
};

export default List;