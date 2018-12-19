import {
  GET_GROCERY_ITEMS_SUCCESS,
  GET_GROCERY_ITEMS_FAILURE,
} from './constants';

const initialState = {
  groceryItems: [],
  newItem: {},
};

const itemReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case GET_GROCERY_ITEMS_SUCCESS:
      return { ...state, groceryItems: action.items };
    default:
      return state;
  };
};

export default itemReducer;
