const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

const setToken = (paramToken) => {
  return jwt.sign(paramToken, secretKey)
}

const decodeToken = (token) => {
  const stringToken = token.split(' ')[1];
  return jwt.verify(stringToken, secretKey);
}

module.exports = {
  setToken,
  decodeToken,
};
