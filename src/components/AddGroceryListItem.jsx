import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AddGroceryListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onNameChange(event) {
    const { target } = event;
    this.setState({
      name: target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onAddItem({ name: this.state.name });
  }

  render() {
    return (
      <div className="grocery-addItem">
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.name} onChange={this.onNameChange}/>
          <button type="submit">Add Item</button>
        </form>
      </div>
    );
  }
}

AddGroceryListItem.propTypes = {
  onAddItem: PropTypes.func.isRequired,
};
