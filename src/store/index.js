import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import itemReducer from './reducer';
import rootSaga from './saga';

const configureStore = initialState => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = () => {
    const middleware = [
      logger,
      sagaMiddleware,
    ];

    if (process.env.NODE_ENV !== 'production') {
      middleware.push(reduxImmutableStateInvariant());
    }

    return middleware;
  };

  const store = createStore(
    itemReducer,
    initialState,
    applyMiddleware(...middlewares()),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}

export default configureStore;
