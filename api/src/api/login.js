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
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/uploadData')
);

module.exports = router;
