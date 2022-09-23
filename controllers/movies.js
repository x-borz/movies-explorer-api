const Movie = require('../models/movie');
const {
  VALIDATION_ERROR,
  MONGO_SERVER_ERROR,
  DUPLICATE_ERROR_CODE,
  CAST_ERROR,
} = require('../utils/constants');
const BadRequestError = require('../errors/bad-request-error');
const { getValidationMessage } = require('../utils/utils');
const ConflictError = require('../errors/conflict-error');
const NoRightsError = require('../errors/no-rights-error');
const NotFoundError = require('../errors/not-found-error');

const getAllMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(`Данные в запросе невалидны: ${getValidationMessage(err)}`));
      } else if (err.name === MONGO_SERVER_ERROR && err.code === DUPLICATE_ERROR_CODE) {
        next(new ConflictError('Указанный фильм уже содержится в избранном текущего пользователя'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (movie) {
        if (req.user._id === movie.owner.toString()) {
          return movie;
        }

        throw new NoRightsError('Текущий пользователь не имеет права удалять фильмы из избранного других пользователей');
      }

      throw new NotFoundError('Фильм не найден в избранном текущего пользователя');
    })
    .then((movie) => Movie.deleteOne({ _id: movie._id }))
    .then(() => res.send({ message: 'Фильм успешно удален из избранного текущего пользователя' }))
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        next(new BadRequestError('Идентификатор фильма в параметрах запроса невалиден'));
      } else {
        next(err);
      }
    });
};

module.exports = { getAllMovies, createMovie, deleteMovie };
