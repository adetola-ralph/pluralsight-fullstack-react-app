import fetch from 'isomorphic-fetch';
import {
  put, takeLatest, call, all, select,
} from 'redux-saga/effects';

import {
  GET_GROCERY_ITEMS,
  ADD_GROCERY_ITEM,
  DELETE_GROCERY_ITEM,
  BUY_UNBUY_GROCERY_ITEM,
} from './constants';
import {
  addItemSucceeded,
  deleteItemSucceeded,
  updateItemSucceeded,
  requestItemsSucceeded,
} from './actions';

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

function* addGroceryItems() {
  const state = yield select();
  const item = { ...state.newItem };

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

function* deleteGroceryItem({ item }) {
  try {
    const response = yield call(fetch, `/api/items/${item._id}`, { method: 'DELETE' });
    yield put(deleteItemSucceeded(item));
  } catch (err) {
    console.error(err);
  }
}

function* buyUnbuyGroceryItem({ item }) {
  const { purchased } = item;
  const payload = { ...item, purchased: !purchased };
  try {
    const response = yield call(fetch, `/api/items/${item._id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    const groceryItem = yield response.json();
    yield put(updateItemSucceeded(groceryItem));
  } catch (err) {
    console.error(err);
  }
}

function* rootSaga() {
  yield all([
    takeLatest(ADD_GROCERY_ITEM, addGroceryItems),
    takeLatest(GET_GROCERY_ITEMS, fetchGroceryItems),
    takeLatest(DELETE_GROCERY_ITEM, deleteGroceryItem),
    takeLatest(BUY_UNBUY_GROCERY_ITEM, buyUnbuyGroceryItem),
  ]);
}

export default rootSaga;
