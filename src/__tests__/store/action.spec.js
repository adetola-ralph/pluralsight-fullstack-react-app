import {
  addItemFailure,
  addItemSucceeded,
  updateItemFailure,
  deleteItemFailure,
  deleteItemSucceeded,
  requestItemsFailure,
  updateItemSucceeded,
  requestItemsSucceeded,
} from '../../store/actions';
import {
  GET_GROCERY_ITEMS_FAILURE,
  GET_GROCERY_ITEMS_SUCCESS,
  ADD_GROCERY_ITEM_SUCCEEDED,
  ADD_GROCERY_ITEM_FAILURE,
  DELETE_GROCERY_ITEM_FAILURE,
  DELETE_GROCERY_ITEM_SUCCEEDED,
  UPDATE_GORCERY_ITEM_SUCCEEDED,
  UPDATE_GORCERY_ITEM_FAILURE,
} from '../../store/constants';

const item = { name: 'Item1', _id: 1 };
const items = [
  { name: 'Item1', _id: 1 },
  { name: 'Item2', purchased: true, _id: 2 }
];

describe('Action tests', () => {
  describe('failure actions', () => {
    test('addItemFailure', () => {
      expect(addItemFailure('error message')).toEqual({
        type: ADD_GROCERY_ITEM_FAILURE,
        message: 'error message',
      });
    });

    test('updateItemFailure', () => {
      expect(updateItemFailure('error message')).toEqual({
        type: UPDATE_GORCERY_ITEM_FAILURE,
        message: 'error message',
      });
    });

    test('deleteItemFailure', () => {
      expect(deleteItemFailure('error message')).toEqual({
        type: DELETE_GROCERY_ITEM_FAILURE,
        message: 'error message',
      });
    });

    test('requestItemsFailure', () => {
      expect(requestItemsFailure('error message')).toEqual({
        type: GET_GROCERY_ITEMS_FAILURE,
        message: 'error message',
      });
    });
  });

  describe('success actions', () => {
    test('addItemSucceeded', () => {
      expect(addItemSucceeded(item)).toEqual({
        type: ADD_GROCERY_ITEM_SUCCEEDED,
        item,
      });
    });

    test('updateItemSucceeded', () => {
      expect(updateItemSucceeded(item)).toEqual({
        type: UPDATE_GORCERY_ITEM_SUCCEEDED,
        item,
      });
    });

    test('deleteItemSucceeded', () => {
      expect(deleteItemSucceeded(item)).toEqual({
        type: DELETE_GROCERY_ITEM_SUCCEEDED,
        item,
      });
    });

    test('requestItemsSucceeded', () => {
      expect(requestItemsSucceeded(items)).toEqual({
        type: GET_GROCERY_ITEMS_SUCCESS,
        items,
      });
    });
  });
});
