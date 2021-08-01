const jwt = require('jsonwebtoken')

function verifyAccessToken (token, JWT_SECRET) {

  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) {
        if (error.name === 'TokenExpiredError') {
          return reject('TokenExpiredError')
        }
        return reject('TokenVerifyError')
      }
      return resolve(decoded)
    })
  })
}

module.exports = { verifyAccessToken }
