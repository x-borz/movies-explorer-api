const { LINK_PATTERN } = require('./constants');

module.exports.isUrlValid = (str) => {
  LINK_PATTERN.test(str);
};
