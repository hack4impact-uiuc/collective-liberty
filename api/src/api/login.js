const router = require('express').Router();
const passport = require('passport');

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
  (req, res) => res.redirect(`${process.env.TEST_CLIENT_HOST || ''}/uploadData`)
);

module.exports = router;
