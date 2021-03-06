import React from 'react';
import PropTypes from 'prop-types';

import { GroceryItem } from './GroceryItem';
import { AddGroceryListItem } from './AddGroceryListItem';

export const GroceryItemList = ({ items, onAddItem, newItem, onNameChange, deleteItem, togglePurchase }) => (
  <div>
    <AddGroceryListItem onAddItem={onAddItem} newItem={newItem} onNameChange={onNameChange} />
    <div>
      {
        items.map(item => (
          <GroceryItem key={item._id} item={item} deleteItem={deleteItem} togglePurchase={togglePurchase} />
        ))
      }
    </div>
  </div>
);

GroceryItemList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      purchased: PropTypes.bool,
      _id: PropTypes.string.isRequired,
    }),
  ),
  onAddItem: PropTypes.func.isRequired,
  onNameChange: PropTypes.func.isRequired,
  newItem: PropTypes.shape({
    name: PropTypes.string,
  }),
  deleteItem: PropTypes.func.isRequired,
  togglePurchase: PropTypes.func.isRequired,
};

