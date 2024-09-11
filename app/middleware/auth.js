const Forbidden = require('../utils/forbidden');
const Unauthorized = require('../utils/unauthorized');
const { decodeToken } = require('../utils/jwtTokens');


const auth = (role) => {
  return (req, _, next) => {

    return handleRole(role, req, next)
  };
}

const handleRole = (role, req, next) => {
  try {
    const decoded = getToken(req);

    const isAdmin = decoded.role === 'ADMIN'

    if (isAdmin || role === decoded.role) return next();
    else throw new Forbidden(`You don't have permission.`)

  } catch (error) {
    const errorMessage = `Authentication problem. ${error.message}`

    if (error.code === 403) throw new Forbidden(errorMessage);

    throw new Unauthorized(errorMessage);
  }
}

const getToken = (req) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new Unauthorized('A token is required for authentication');
  }

  if (token.split(' ').length < 2) {
    throw new Unauthorized('Wrong authentication token format.');
  }
  return decodeToken(token);
}

module.exports = auth
