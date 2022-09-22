const rateLimit = require('express-rate-limit');

// разрешаем не более 100 запросов с одного IP за 5 минут
module.exports = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
});
