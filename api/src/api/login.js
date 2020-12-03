const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const state = baseUrl
    ? Buffer.from(JSON.stringify({ baseUrl })).toString('base64')
    : null;
  const auth = passport.authenticate('google', {
    scope: ['openid', 'profile', 'email'],
    state,
  });

  auth(req, res, next);
});

router.get(
  '/callback',
  (req, res, next) => {
    const { state } = req.query;
    const { baseUrl } = JSON.parse(Buffer.from(state, 'base64').toString());
    const verify = passport.authenticate('google', {
      failureRedirect: `${baseUrl}/login`,
    });

    if (typeof baseUrl === 'string') {
      verify();
    }

    verify(req, res, next);
  },
  (req, res) => res.redirect(`${req.protocol}://${req.get('host')}/uploadData`)
);

module.exports = router;
