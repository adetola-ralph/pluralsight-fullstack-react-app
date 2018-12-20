import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const GroceryItem = ({ item, deleteItem, togglePurchase }) => (
  <div>
    <div>
      <h4 className={classNames({ strikethrough: item.purchased })}>
        {item.name}
      </h4>
      <button onClick={() => togglePurchase(item)}>
        {item.purchased ? 'Unbuy' : 'Buy'}
      </button>
      <button onClick={() => deleteItem(item)}>
        delete
      </button>
    </div>
  </div>
);

GroceryItem.propTypes = {
  items: PropTypes.shape({
    name: PropTypes.string.isRequired,
    purchased: PropTypes.bool,
    _id: PropTypes.string.isRequired,
  }),
  deleteItem: PropTypes.func.isRequired,
  togglePurchase: PropTypes.func.isRequired,
};

GroceryItem.defaultProps = {
  purchased: false,
};
