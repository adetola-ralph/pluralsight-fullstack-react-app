import React from 'react';
import PropTypes from 'prop-types';

import { GroceryItem } from './GroceryItem';
import { AddGroceryListItem } from './AddGroceryListItem';

export const GroceryItemList = ({ items, onAddItem }) => (
  <div>
    <h1>Grocery Listify</h1>
    <AddGroceryListItem onAddItem={onAddItem}/>
    <div>
      {
        items.map(item => (
          <GroceryItem key={item._id} item={item} />
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
};

