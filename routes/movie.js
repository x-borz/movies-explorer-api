const userRouter = require('express').Router();
const { getAllMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validMovieId, validMovieCreating } = require('../validators/movie');

userRouter.get('/', getAllMovies);
userRouter.post('/', validMovieCreating, createMovie);
userRouter.delete('/:movieId', validMovieId, deleteMovie);

module.exports = userRouter;
