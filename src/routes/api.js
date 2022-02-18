const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/', passport.authenticate('bearer', { session: false, failWithError: true }),
  (req, res, next) => {
    return res.json({ msg: 'API is running' });
  },
  (err, req, res, next) => {
    return res.status(401).send({ success: false, message: err })
  }
);

module.exports = router;
