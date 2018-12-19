import fetch from 'isomorphic-fetch';
import { put, takeLatest, call, all } from 'redux-saga/effects';

import { GET_GROCERY_ITEMS, ADD_GROCERY_ITEM } from './constants';
import { requestItemsSucceeded, addItemSucceeded } from './actions';

function* fetchGroceryItems() {
  try {
    const response = yield call(fetch, '/api/items');
    const items = yield response.json();
    yield put(requestItemsSucceeded(items));
  } catch (err) {
    console.error(err);
    // yield put()
  }
}

function* addGroceryItems(action) {
  const { item } = action;

  try {
    const response = yield call(fetch, '/api/items', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
    });
    const responseItem = yield response.json();
    yield put(addItemSucceeded(responseItem));
  } catch (err) {
    console.error(err);
    // yield put()
  }
}

function* rootSaga() {
  yield all([
    takeLatest(GET_GROCERY_ITEMS, fetchGroceryItems),
    takeLatest(ADD_GROCERY_ITEM, addGroceryItems),
  ]);
}

export default rootSaga;
