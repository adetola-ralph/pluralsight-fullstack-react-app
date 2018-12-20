import path from 'path';
import fs from 'fs-extra';
import morgan from 'morgan';
import dotenv from 'dotenv';
import webpack from 'webpack';
import express from 'express';
import yields from 'express-yields';
import bodyParser from 'body-parser';

import routes from './routes';

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
  const config = require('../webpack.config.dev.babel').default;
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
} /* else {

} */

routes(router);
app.use('/api', router);

app.get(['/'], function* (req, res) {
  let index = yield fs.readFile('./public/index.html', 'utf-8');
  res.send(index);
});

// error handler
app.use((err, req, res, next) => {
  if (err.isBoom) {
    res.status(err.output.statusCode).json(err.output.payload);
  } else {
    res.status(500).send();
  }
});

app.listen(port, '0.0.0.0', () => console.info(`App listening on port ${port}`));
