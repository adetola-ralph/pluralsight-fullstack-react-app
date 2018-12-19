import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const GroceryItem = ({ item }) => (
  <div>
    <div>
      <h4 className={classNames({ strikethrough: item.purchased })}>
        {item.name}
      </h4>
    </div>
  </div>
);

GroceryItem.propTypes = {
  items: PropTypes.shape({
    name: PropTypes.string.isRequired,
    purchased: PropTypes.bool,
    _id: PropTypes.string.isRequired,
  }),
};

GroceryItem.defaultProps = {
  purchased: false,
};
