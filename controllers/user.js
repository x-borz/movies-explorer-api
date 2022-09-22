const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const { VALIDATION_ERROR, MONGO_SERVER_ERROR, DUPLICATE_ERROR_CODE } = require('../utils/constants');
const BadRequestError = require('../errors/bad-request-error');
const { getValidationMessage } = require('../utils/utils');
const ConflictError = require('../errors/conflict-error');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .select('-_id')
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
    })
    .catch((err) => next(err));
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .select('-_id')
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(`Данные в запросе невалидны: ${getValidationMessage(err)}`));
      } else if (err.name === MONGO_SERVER_ERROR && err.code === DUPLICATE_ERROR_CODE) {
        next(new ConflictError('Пользователь с указанным в запросе email уже зарегистрирован'));
      } else {
        next(err);
      }
    });
};

module.exports = { getUser, updateUser };
