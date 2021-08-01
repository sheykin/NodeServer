const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'secret';
const ACCESS_TOKEN_EXPIRED = '30m';

module.exports = {
  JWT_SECRET,
  ACCESS_TOKEN_EXPIRED,
  COOKIE_SECRET
}
