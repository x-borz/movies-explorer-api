const mongoose = require('mongoose');
const { isUrlValid } = require('../utils/utils');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: 'не заполнено обязательное поле {PATH}',
    },
    director: {
      type: String,
      required: 'не заполнено обязательное поле {PATH}',
    },
    duration: {
      type: Number,
      required: 'не заполнено обязательное поле {PATH}',
    },
    year: {
      type: String,
      required: 'не заполнено обязательное поле {PATH}',
    },
    description: {
      type: String,
      required: 'не заполнено обязательное поле {PATH}',
    },
    image: {
      type: String,
      required: 'не заполнено обязательное поле {PATH}',
      validate: [isUrlValid, 'в поле {PATH} указана невалидная ссылка на постер'],
    },
    trailerLink: {
      type: String,
      required: 'не заполнено обязательное поле {PATH}',
      validate: [isUrlValid, 'в поле {PATH} указана невалидная ссылка на трейлер'],
    },
    thumbnail: {
      type: String,
      required: 'не заполнено обязательное поле {PATH}',
      validate: [isUrlValid, 'в поле {PATH} указана невалидная ссылка на миниатюрный постер'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: 'не заполнено обязательное поле {PATH}',
    },
    movieId: {
      type: Number,
      unique: true,
      required: 'не заполнено обязательное поле {PATH}',
    },
    nameRU: {
      type: String,
      required: 'не заполнено обязательное поле {PATH}',
    },
    nameEN: {
      type: String,
      required: 'не заполнено обязательное поле {PATH}',
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);
