import {
  GET_GROCERY_ITEMS_FAILURE,
  GET_GROCERY_ITEMS_SUCCESS,
  ADD_GROCERY_ITEM_SUCCEEDED,
  ADD_GROCERY_ITEM_FAILURE,
  DELETE_GROCERY_ITEM_FAILURE,
  DELETE_GROCERY_ITEM_SUCCEEDED,
  UPDATE_GORCERY_ITEM_SUCCEEDED,
  UPDATE_GORCERY_ITEM_FAILURE,
} from './constants';

export const requestItemsSucceeded = items => ({
  type: GET_GROCERY_ITEMS_SUCCESS,
  items,
});

export const requestItemsFailure = message => ({
  type: GET_GROCERY_ITEMS_FAILURE,
  message,
});

export const addItemSucceeded = item => ({
  type: ADD_GROCERY_ITEM_SUCCEEDED,
  item,
});

export const addItemFailure = message => ({
  type: ADD_GROCERY_ITEM_FAILURE,
  message,
});

export const deleteItemSucceeded = item => ({
  type: DELETE_GROCERY_ITEM_SUCCEEDED,
  item,
});

export const deleteItemFailure = message => ({
  type: DELETE_GROCERY_ITEM_FAILURE,
  message,
});

export const updateItemSucceeded = item => ({
  type: UPDATE_GORCERY_ITEM_SUCCEEDED,
  item,
});

export const updateItemFailure = message => ({
  type: UPDATE_GORCERY_ITEM_FAILURE,
  message,
});
