import React from 'react';
import { connect } from 'react-redux';

// constants
import { ADD_GROCERY_ITEM } from './store/constants'

// components
import { GroceryItemList } from './components/GroceryItemList';

export const App = ({ groceryItems, dispatch }) => {
  const onAddItem = (item) => dispatch({
    type: ADD_GROCERY_ITEM,
    item,
  });

  return (
    <div>
      <GroceryItemList items={groceryItems} onAddItem={onAddItem} />
    </div>
  )
};

const mapStateToProps = (state) => {
  const { groceryItems } = state;

  return {
    groceryItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
