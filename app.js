const express = require('express');
const mongoose = require('mongoose');
const { PORT } = require('./utils/constants');

const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

// todo: добавить роуты

app.listen(PORT);
