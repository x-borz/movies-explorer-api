const AuthError = require('../errors/auth-error');

module.exports = (req, res, next) => {
  req.user = {
    _id: '632c44e6457e44fd5f349b94',
  };

  next();
  // next(new AuthError('Необходима авторизация'));
};
