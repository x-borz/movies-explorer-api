const userRouter = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { validUserUpdating } = require('../validators/user');

userRouter.get('/me', getUser);
userRouter.patch('/me', validUserUpdating, updateUser);

module.exports = userRouter;
