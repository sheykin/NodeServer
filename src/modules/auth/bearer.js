const passport = require('passport')
const BearerStrategy = require('passport-http-bearer').Strategy
const { verifyAccessToken } = require('../../utils')
const config = require('../../../src/config')

passport.use(new BearerStrategy(
  async function (accessToken, done) {
    if (accessToken) {
      try{
        const isVerify = await verifyAccessToken(accessToken, config.ENV.JWT_SECRET)
        return done(null, isVerify);
      } catch (error) {
        return done(null, false);
      }
    }
  }
));
