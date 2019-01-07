import sinon from 'sinon';
import { call, put, select } from 'redux-saga/effects';

import {
  addGroceryItems,
  buyUnbuyGroceryItem,
  deleteGroceryItem,
  fetchGroceryItems
} from '../../store/saga';
import {
  addItemSucceeded,
  deleteItemSucceeded,
  updateItemSucceeded,
  requestItemsSucceeded,
  requestItemsFailure,
  addItemFailure,
  deleteItemFailure,
  updateItemFailure,
} from '../../store/actions';

global.fetch = sinon.stub(global, 'fetch');

describe('Sagas', () => {
  test('fetchGroceryItems', () => {
    const saga = fetchGroceryItems();
    const value = saga.next().value;
    expect(value).toEqual(call(fetch, '/api/items'));
    const items = saga.next({ json: () => [{}] }).value;
    expect(items).toEqual([{}]);
    const putResult = saga.next(items).value;
    expect(putResult).toEqual(put(requestItemsSucceeded(items)));
  });

  test('fetchGroceryItems error handling', () => {
    const saga = fetchGroceryItems();
    const value = saga.next().value;
    expect(saga.throw('Error here').value).toEqual(put(requestItemsFailure('Error getting grocery items, please try again later')));
  });

  test('deleteGroceryItem', () => {
    const _id = 3;
    const item = { _id };
    const saga = deleteGroceryItem({ item });
    const value = saga.next().value;
    expect(value).toEqual(call(fetch, `/api/items/${_id}`, { method: 'DELETE' }));
    const putResult = saga.next(item).value;
    expect(putResult).toEqual(put(deleteItemSucceeded(item)));
  });

  test('deleteGroceryItem error handling', () => {
    const _id = 3;
    const item = { _id };
    const saga = deleteGroceryItem({ item });
    const value = saga.next().value;
    expect(saga.throw('Error here').value).toEqual(put(deleteItemFailure('Error deleting grocery items, please try again later')));
  });

  test('buyUnbuyGroceryItem', () => {
    const _id = 2;
    const item = { _id };
    const saga = buyUnbuyGroceryItem({ item });
    const value = saga.next().value;
    expect(value).toEqual(call(fetch, `/api/items/${_id}`, {
      method: 'PATCH',
      body: JSON.stringify({ ...item, purchased: true }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    }));
    const serverResult = saga.next({ json: () => ({ ...item, purchased: true }) }).value;
    expect(serverResult).toEqual({ ...item, purchased: true })
    const putResult = saga.next(serverResult).value;
    expect(putResult).toEqual(put(updateItemSucceeded({ ...item, purchased: true })));
  });

  test('buyUnbuyGroceryItem error handling', () => {
    const _id = 2;
    const item = { _id };
    const saga = buyUnbuyGroceryItem({ item });
    saga.next();
    expect(saga.throw('Error here').value).toEqual(put(updateItemFailure('Error buying the grocery items, please try again later')));
  });

  test('addGroceryItems', () => {
    const newItem = {
      name: 'Oreofe',
    };
    const saga = addGroceryItems();
    const selectResult = saga.next().value;
    expect(selectResult).toEqual(select())

    const result = saga.next({ newItem }).value;
    expect(result).toEqual(call(fetch, '/api/items', {
      method: 'POST',
      body: JSON.stringify(newItem),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    }));

    const response = saga.next({ json: () => newItem }).value;
    expect(response).toEqual(newItem);
    expect(saga.next(response).value).toEqual(put(addItemSucceeded(response)));
  });

  test('addGroceryItems error handling', () => {
    const saga = addGroceryItems();
    saga.next();
    saga.next({ newItem: { name: 'Oreofe' } });
    expect(saga.throw('Error message').value).toEqual(put(addItemFailure('Error adding new grocery items, please try again later')))
  });
});
