const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/auth-error');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: 'не заполнено обязательное поле {PATH}',
      unique: true,
      validate: [isEmail, 'в поле {PATH} указан невалидный адрес электронной почты'],
    },
    password: {
      type: String,
      required: 'не заполнено обязательное поле {PATH}',
      select: false,
    },
    name: {
      type: String,
      required: 'не заполнено обязательное поле {PATH}',
      minlength: [2, 'длина поля {PATH} должна быть не менее 2 символов'],
      maxlength: [30, 'длина поля {PATH} должна быть не более 30 символов'],
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Неправильные почта или пароль');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
