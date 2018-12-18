import fs from 'fs-extra';
import morgan from 'morgan';
import webpack from 'webpack';
import express from 'express';
import yields from 'express-yields';
import fs from 'fs-extra';

const app = express();
const port = process.eventNames.PORT || '1246';

if (process.env.NODE_ENV === 'development') {
  const config = require('../webpack.config.dev.babel').default;
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.get(['/'], function* (req, res) {
  let index = yield fs.readFile('./public/index.html', 'utf-8');
  res.send(index);
});

app.listen(port, '0.0.0.0', () => console.info(`App listening on port ${port}`));
