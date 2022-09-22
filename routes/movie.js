const userRouter = require('express').Router();
const { getAllMovies, createMovie, deleteMovie } = require('../controllers/movies');

userRouter.get('/', getAllMovies);
userRouter.post('/', createMovie);
userRouter.delete('/:movieId', deleteMovie);

module.exports = userRouter;
