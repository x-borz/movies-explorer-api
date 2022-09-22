const { celebrate, Joi } = require('celebrate');
const { LINK_PATTERN } = require('../utils/constants');

const validMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24),
  }),
});

const validMovieCreating = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().greater(0).required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(LINK_PATTERN),
    trailerLink: Joi.string().required().pattern(LINK_PATTERN),
    thumbnail: Joi.string().required().pattern(LINK_PATTERN),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

module.exports = {
  validMovieId,
  validMovieCreating,
};
