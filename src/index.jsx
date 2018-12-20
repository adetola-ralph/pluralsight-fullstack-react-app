import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// store
import configureStore from './store';

// app
import App from './App';

// styles
import './styles.css';
import '@fortawesome/fontawesome-free/css/all.css';

const store = configureStore();

store.dispatch({ type: 'GET_GROCERY_ITEMS' });

render(
  <Provider store={store}>
    <App />
  </Provider>, document.querySelector('#app'));
