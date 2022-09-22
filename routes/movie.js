const userRouter = require('express').Router();
const { getAllMovies, createMovie, deleteMovie } = require('../controllers/movie');

userRouter.get('/', getAllMovies);
userRouter.post('/', createMovie);
userRouter.delete('/:filmId', deleteMovie);

module.exports = userRouter;
