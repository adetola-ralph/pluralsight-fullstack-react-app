import {
  GET_GROCERY_ITEMS_SUCCESS,
  GET_GROCERY_ITEMS_FAILURE,
  ADD_GROCERY_ITEM_SUCCEEDED,
  NEW_ITEM_UPDATE,
} from './constants';

const initialState = {
  groceryItems: [],
  newItem: {
    name: '',
  },
};

const itemReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case GET_GROCERY_ITEMS_SUCCESS:
      return { ...state, groceryItems: action.items };
    case ADD_GROCERY_ITEM_SUCCEEDED:
      const { groceryItems } = state;
      const newGroceryItems = [...groceryItems, action.item];
      return { ...state, groceryItems: newGroceryItems, newItem: { name: '' } };
    case NEW_ITEM_UPDATE:
      let { newItem } = state;
      newItem = { ...newItem, name: action.name };
      return { ...state, newItem };
    default:
      return state;
  };
};

export default itemReducer;
