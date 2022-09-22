require('dotenv').config();

const { PORT = 3000, NODE_ENV, JWT_SECRET: jwtSecret } = process.env;

const JWT_SECRET = NODE_ENV === 'production' ? jwtSecret : 'dev-secret';

module.exports = {
  PORT,
  JWT_SECRET,
};
