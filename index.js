const morgan = require('morgan');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const { loggerMiddleware } = require('./src/logger');
const routes = require('./src/router');

const app = express();

app.use(
  morgan('tiny'),
  helmet(),
  cors(),
  bodyParser.json(),
  loggerMiddleware,
  routes,
);

app.listen(process.env.PORT || 3000, () => console.log('server started'));

module.exports = app;
