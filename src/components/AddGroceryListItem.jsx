import React from 'react';
import PropTypes from 'prop-types';


export const AddGroceryListItem = ({ newItem, onNameChange, onAddItem }) => {
  const onSubmit = (event) => {
    event.preventDefault();
    onAddItem();
  };

  return (
    <div className="grocery-addItem">
      <form onSubmit={onSubmit}>
        <input type="text" value={newItem.name} onChange={onNameChange} placeholder="Add new item here" />
        <button type="submit">
          <i className="fas fa-plus" />
          Add Item
        </button>
      </form>
    </div>
  );
};


AddGroceryListItem.propTypes = {
  onAddItem: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  newItem: PropTypes.shape({
    name: PropTypes.string,
  }),
};
