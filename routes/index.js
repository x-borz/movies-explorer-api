const router = require('express').Router();
const { sendNotFoundResponse } = require('../controllers/404');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validSignin, validSignup } = require('../validators/user');

router.post('/signin', validSignin, login);
router.post('/signup', validSignup, createUser);

router.use(auth);

router.use('/users', require('./user'));
router.use('/movies', require('./movie'));

router.use('*', sendNotFoundResponse);

module.exports = router;
