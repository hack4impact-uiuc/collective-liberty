const router = require('express').Router();
const passport = require('passport');

// shoutout to Josh Byster for being a god

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

router.get('/redirect', (req, res) => {
  try {
    const { state } = req.query;
    const { baseUrl } = JSON.parse(Buffer.from(state, 'base64').toString());

    if (typeof baseUrl === 'string') {
      return res.redirect(
        `${baseUrl}/api/login/callback?${req._parsedUrl.query}`
      );
    }

    return res.redirect('/api/login/callback');
  } catch (e) {
    return res.status(403).json({
      code: 403,
      message: 'Failed to redirect',
      success: false,
    });
  }
});

router.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/uploadData')
);

module.exports = router;
