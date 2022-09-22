const router = require('express').Router();
const { sendNotFoundResponse } = require('../controllers/404');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signin', login);
router.post('/signup', createUser);

router.use(auth);

router.use('/users', require('./user'));
router.use('/movies', require('./movie'));

router.use('*', sendNotFoundResponse);

module.exports = router;
