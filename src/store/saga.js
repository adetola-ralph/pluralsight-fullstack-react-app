import fetch from 'isomorphic-fetch';
import { put, takeLatest } from 'redux-saga/effects';

import { GET_GROCERY_ITEMS } from './constants';
import { requestItemsSucceeded } from './actions';

function* fetchGroceryItems() {
  console.log('it ran here');
  try {
    const response = yield fetch('/api/items');
    const items = yield response.json();
    yield put(requestItemsSucceeded(items));
  } catch (err) {
    console.error(err);
  }
}

function* fetchGroceryItemsSaga() {
  yield takeLatest(GET_GROCERY_ITEMS, fetchGroceryItems);
}

export {
  fetchGroceryItemsSaga,
};
