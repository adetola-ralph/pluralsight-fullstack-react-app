import path from 'path';
import fs from 'fs-extra';
import morgan from 'morgan';
import dotenv from 'dotenv';
import webpack from 'webpack';
import express from 'express';
import yields from 'express-yields';
import bodyParser from 'body-parser';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import App from '../src/App';
import routes from './routes';
import configureStore from '../src/store';
import { getGroceryItems } from './controller/groceryItem';

if (process.env.NODE_ENV === 'development') {
  dotenv.config({
    silent: true,
    debug: true,
    path: path.join(__dirname, '../.env'),
  });
}

// db connection
// used require because import ran beofre the dotenv config process
require('./db-config');

const app = express();
const router = express.Router();
const port = process.env.PORT || '1246';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

if (process.env.NODE_ENV === 'development') {
  const config = require('../webpack.config.babel').default;
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(express.static("public"))

routes(router);
app.use('/api', router);

app.get(['/'], function* (req, res) {
  let index = yield fs.readFile('./public/index.html', 'utf-8');

  const intialState = {
    groceryItems: [],
    newItem: {
      name: '',
    },
    errorMessage: '',
  };

  const groceryItems = yield getGroceryItems();
  intialState.groceryItems = JSON.parse(JSON.stringify(groceryItems));

  const store = configureStore(intialState);
  const appRendered = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );


  index = index.replace('<div id="root"></div>', appRendered);
  res.send(index);
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  if (err.isBoom) {
    res.status(err.output.statusCode).json(err.output.payload);
  } else {
    res.status(500).send();
  }
});

app.listen(port, '0.0.0.0', () => console.info(`App listening on port ${port}`));
