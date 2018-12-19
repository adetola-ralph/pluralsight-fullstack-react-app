import {
  GET_GROCERY_ITEMS,
  GET_GROCERY_ITEMS_FAILURE,
  GET_GROCERY_ITEMS_SUCCESS,
  ADD_GROCERY_ITEM,
  ADD_GROCERY_ITEM_SUCCEEDED,
  ADD_GROCERY_ITEM_FAILURE,
} from './constants';

export const requestItemsSucceeded = (items) => ({
  type: GET_GROCERY_ITEMS_SUCCESS,
  items,
});

export const requestItemsFailed = () => ({
  type: GET_GROCERY_ITEMS_FAILURE,
});

export const addItemSucceeded = (item) => ({
  type: ADD_GROCERY_ITEM_SUCCEEDED,
  item,
});

export const addItemFailed = () => ({
  type: ADD_GROCERY_ITEM_FAILURE,
});
