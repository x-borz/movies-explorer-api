const { errors } = require('celebrate');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PORT, DB_CONNECTION_STRING } = require('./utils/constants');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');

const app = express();

mongoose.connect(DB_CONNECTION_STRING, {
  useNewUrlParser: true,
});

app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.use('/', require('./routes'));

app.use(errors());
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT);
