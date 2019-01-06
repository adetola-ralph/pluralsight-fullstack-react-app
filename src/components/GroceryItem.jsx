import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const GroceryItem = ({ item, deleteItem, togglePurchase }) => (
  <div className="grocery-item">
    <h4 className={classNames({ strikethrough: item.purchased })}>
      <i className={classNames("far", { "fa-circle": !item.purchased, "fa-check-circle": item.purchased })} />
      {item.name}
    </h4>
    <div className="actions">
      <button onClick={() => togglePurchase(item)} className={classNames("purchase", { "focus": !item.purchased })}>
        <span className={classNames({ "fa-stack": item.purchased })}>
          {item.purchased && <i className="fas fa-ban fa-stack-2x" />}
          <i className={classNames("fas", "fa-shopping-cart", { "fa-stack-1x": item.purchased })} />
        </span>
        <span>{item.purchased ? 'Unbuy' : 'Buy'}</span>
      </button>
      <button onClick={() => deleteItem(item)} className="delete">
        <i className="fas fa-trash" />
      </button>
    </div>
  </div>
);

GroceryItem.propTypes = {
  item: PropTypes.shape({
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
