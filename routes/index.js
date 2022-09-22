const router = require('express').Router();
const { sendNotFoundResponse } = require('../controllers/404');

router.use('/users', require('./user'));
router.use('/movies', require('./movie'));

router.use('*', sendNotFoundResponse);

module.exports = router;
