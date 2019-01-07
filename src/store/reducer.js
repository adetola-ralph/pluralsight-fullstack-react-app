import {
  GET_GROCERY_ITEMS_SUCCESS,
  ADD_GROCERY_ITEM_SUCCEEDED,
  NEW_ITEM_UPDATE,
  DELETE_GROCERY_ITEM_SUCCEEDED,
  UPDATE_GORCERY_ITEM_SUCCEEDED,
} from './constants';

export const initialState = {
  groceryItems: [],
  newItem: {
    name: '',
  },
  errorMessage: '',
};

const itemReducer = (state = initialState, action) => {
  const { type } = action;

  if (/(_FAILURE)$/g.test(type)) {
    const { message } = action;
    return {
      ...state,
      errorMessage: message,
    };
  }

  switch (type) {
    case GET_GROCERY_ITEMS_SUCCESS: {
      return { ...state, groceryItems: action.items, errorMessage: '' };
    }
    case ADD_GROCERY_ITEM_SUCCEEDED: {
      const { groceryItems } = state;
      const newGroceryItems = [...groceryItems, action.item];
      return { ...state, groceryItems: newGroceryItems, newItem: { name: '' }, errorMessage: '' };
    }
    case NEW_ITEM_UPDATE: {
      let { newItem } = state;
      newItem = { ...newItem, name: action.name };
      return { ...state, newItem };
    }
    case DELETE_GROCERY_ITEM_SUCCEEDED: {
      const { groceryItems } = state;
      const newGroceryItems = groceryItems.filter(item => item._id !== action.item._id);
      return { ...state, groceryItems: newGroceryItems, errorMessage: '' };
    }
    case UPDATE_GORCERY_ITEM_SUCCEEDED: {
      const { groceryItems } = state;
      const newGroceryItems = groceryItems.map((item) => {
        if (item._id === action.item._id) {
          return action.item;
        }

        return item;
      });
      return { ...state, groceryItems: newGroceryItems, errorMessage: '' };
    }
    default:
      return state;
  }
};

export default itemReducer;
