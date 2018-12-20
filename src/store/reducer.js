import {
  GET_GROCERY_ITEMS_SUCCESS,
  ADD_GROCERY_ITEM_SUCCEEDED,
  NEW_ITEM_UPDATE,
  DELETE_GROCERY_ITEM_SUCCEEDED,
  UPDATE_GORCERY_ITEM_SUCCEEDED
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
    case GET_GROCERY_ITEMS_SUCCESS: {
      return { ...state, groceryItems: action.items };
    }
    case ADD_GROCERY_ITEM_SUCCEEDED: {
      const { groceryItems } = state;
      const newGroceryItems = [...groceryItems, action.item];
      return { ...state, groceryItems: newGroceryItems, newItem: { name: '' } };
    }
    case NEW_ITEM_UPDATE: {
      let { newItem } = state;
      newItem = { ...newItem, name: action.name };
      return { ...state, newItem };
    }
    case DELETE_GROCERY_ITEM_SUCCEEDED: {
      const { groceryItems } = state;
      const newGroceryItems = groceryItems.filter((item) => item._id !== action.item._id);
      return { ...state, groceryItems: newGroceryItems };
    }
    case UPDATE_GORCERY_ITEM_SUCCEEDED: {
      const { groceryItems } = state;
      const newGroceryItems = groceryItems.map(item => {
        if (item._id === action.item._id) {
          return action.item;
        }

        return item;
      });
      return { ...state, groceryItems: newGroceryItems };
    }
    default:
      return state;
  };
};

export default itemReducer;
