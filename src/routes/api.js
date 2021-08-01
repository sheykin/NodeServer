const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/', passport.authenticate('bearer', { session: false }),
  (req, res) => {
  res.json({ msg: 'API is running' });
});

module.exports = router;
