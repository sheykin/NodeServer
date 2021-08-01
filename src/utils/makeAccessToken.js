const jwt = require('jsonwebtoken')
const config = require('./../../src/config/env')

function makeAccessToken (userEntity) {
  return jwt.sign(
    {
      tokenType: 'ACCESS_TOKEN',
      username: userEntity.name,
      userRole: userEntity.role,
      email: userEntity.email,
    },
    config.JWT_SECRET,
    {
    expiresIn: config.ACCESS_TOKEN_EXPIRED,
    algorithm: 'HS512'
  });
}

module.exports = { makeAccessToken }
