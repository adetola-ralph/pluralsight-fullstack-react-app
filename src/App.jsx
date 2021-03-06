import React, { Fragment } from 'react';
import { connect } from 'react-redux';

// constants
import {
  ADD_GROCERY_ITEM,
  NEW_ITEM_UPDATE,
  DELETE_GROCERY_ITEM,
  BUY_UNBUY_GROCERY_ITEM
} from './store/constants';

// components
import { GroceryItemList } from './components/GroceryItemList';

export const App = ({ groceryItems, dispatch, newItem, errorMessage }) => {
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

  const deleteItem = (item) => dispatch({
    type: DELETE_GROCERY_ITEM,
    item,
  });

  const togglePurchase = (item) => dispatch({
    type: BUY_UNBUY_GROCERY_ITEM,
    item,
  });

  return (
    <Fragment>
      <div className="header">
        <div className="container">
          <h2>Grocery Listify</h2>
        </div>
      </div>
      <div className="container">
        {errorMessage !== '' && <p className="error-message">{errorMessage}</p>}
        <GroceryItemList
          items={groceryItems}
          onAddItem={onAddItem}
          newItem={newItem}
          onNameChange={onNameChange}
          deleteItem={deleteItem}
          togglePurchase={togglePurchase}
        />
      </div>
    </Fragment>
  )
};

export const mapStateToProps = (state) => {
  const { groceryItems, newItem, errorMessage } = state;

  return {
    newItem,
    groceryItems,
    errorMessage,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
