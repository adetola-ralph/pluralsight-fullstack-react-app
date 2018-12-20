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

function renderApp(_App) {
  render(
    <Provider store={store}>
      <_App />
    </Provider>, document.querySelector('#app'));
}

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    renderApp(NextApp);
  });
}

renderApp(App);
