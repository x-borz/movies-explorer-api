const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PORT } = require('./utils/constants');
const errorHandler = require('./middlewares/error-handler');

const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', require('./routes'));

app.use(errorHandler);

app.listen(PORT);
