const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));

const isDeveloping = process.env.NODE_ENV !== 'production';

app.use(express.static(path.join(__dirname, '../dist')));

if (isDeveloping && process.argv[3] !== 'no-webpack') {
  const webpack = require('webpack');
  const config = require('./../webpack.config.dev.js');

  const compiler = webpack(config);

  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: config.output.publicPath,
      stats: {
        colors: true,
      },
    }),
  );

  app.use(require('webpack-hot-middleware')(compiler));
}

// !!Last ditch error handling!!
process.on('uncaughtException', err => {
  console.log('Unhandled exception!');
  console.error(err.stack);
});

app.listen(process.env.PORT || 8080, error => {
  if (!error) {
    console.log(`App is running on port: ${process.env.PORT || 8080}!`);
  }

  if (isDeveloping) {
    require('open')('http://localhost:8080');
  }
});

require('./routes')(app, path);
