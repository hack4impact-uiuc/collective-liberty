const router = require('express').Router();
const passport = require('passport');
const errorWrap = require('../middleware/errorWrap');

router.get(
  '/',
  passport.authenticate('google', {
    scope: ['openid', 'profile', 'email'],
  })
);

router.get(
  '/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.TEST_CLIENT_HOST || ''}/login`,
  }),
  errorWrap(async (req, res) => {
    res.redirect(`${process.env.TEST_CLIENT_HOST || ''}/uploadData`);
  })
);

module.exports = router;
