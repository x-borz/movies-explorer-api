require('dotenv').config();

const { PORT = 3000, NODE_ENV, JWT_SECRET: jwtSecret } = process.env;

const JWT_SECRET = NODE_ENV === 'production' ? jwtSecret : 'dev-secret';
const LINK_PATTERN = /^https?:\/\/(w{3}\.)?[a-z\d-]+\.[a-z]{2,3}[a-z\d\-._~:?#@!$&'()*+,;=[\]/]*#?$/i;

const VALIDATION_ERROR = 'ValidationError';
const MONGO_SERVER_ERROR = 'MongoServerError';
const CAST_ERROR = 'CastError';

const DUPLICATE_ERROR_CODE = 11000;

module.exports = {
  PORT,
  JWT_SECRET,
  LINK_PATTERN,
  VALIDATION_ERROR,
  MONGO_SERVER_ERROR,
  CAST_ERROR,
  DUPLICATE_ERROR_CODE,
};
