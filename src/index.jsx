import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// store
import configureStore from './store';

// app
import { App } from './App';

// const store = configureStore();

render(<App />, document.querySelector('#app'))
