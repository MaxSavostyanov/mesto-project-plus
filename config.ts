require('dotenv').config();

const { MONGODB_URI, PORT, SECRET_KEY } = process.env;

module.exports = {
  MONGODB_URI: MONGODB_URI || 'mongodb://localhost:27017/mestobd',
  PORT: PORT || 3000,
  SECRET_KEY: SECRET_KEY || 'some-secret-key',
};
