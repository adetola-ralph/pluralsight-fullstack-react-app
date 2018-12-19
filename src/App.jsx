import React from 'react';
import { connect } from 'react-redux';

// constants
import { ADD_GROCERY_ITEM, NEW_ITEM_UPDATE } from './store/constants'

// components
import { GroceryItemList } from './components/GroceryItemList';

export const App = ({ groceryItems, dispatch, newItem }) => {
  const onAddItem = () => dispatch({
    type: ADD_GROCERY_ITEM,
  });

  const onNameChange = (event) => {
    const { target } = event;
    const name = target.value;
    dispatch({
      type: NEW_ITEM_UPDATE,
      name,
    });
  };

  return (
    <div>
      <GroceryItemList items={groceryItems} onAddItem={onAddItem} newItem={newItem} onNameChange={onNameChange} />
    </div>
  )
};

const mapStateToProps = (state) => {
  const { groceryItems, newItem } = state;

  return {
    groceryItems,
    newItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
