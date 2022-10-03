const { errors } = require('celebrate');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PORT, DB_CONNECTION_STRING } = require('./utils/constants');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');

const app = express();

mongoose.connect(DB_CONNECTION_STRING, {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: ['https://api.xborz.diploma.nomoredomains.club', 'http://api.xborz.diploma.nomoredomains.club'],
  methods: 'GET,POST,DELETE,OPTIONS,PATCH',
}));

app.use('/', require('./routes'));

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
