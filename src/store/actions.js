import { GET_GROCERY_ITEMS_FAILURE, GET_GROCERY_ITEMS_SUCCESS } from './constants';

export const requestItemsSucceeded = (items) => ({
  type: GET_GROCERY_ITEMS_SUCCESS,
  items,
});

export const requestItemsFailed = () => ({
  type: GET_GROCERY_ITEMS_FAILURE,
});
