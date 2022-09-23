const { LINK_PATTERN } = require('./constants');

module.exports.isUrlValid = (str) => LINK_PATTERN.test(str);

module.exports.getValidationMessage = (validError) => {
  const { errors } = validError;
  return Object.keys(errors).map((item) => errors[item].message).join('; ');
};
