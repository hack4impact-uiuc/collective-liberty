const router = require('express').Router();
const errorWrap = require('../middleware/errorWrap');

router.post(
  '/',
  errorWrap(async (req, res) => {
    if (req.user) {
      req.logout();
      return res.status(200).json({
        code: 200,
        message: 'Logged out.',
        success: true,
      });
    }

    return res.status(304).json({
      code: 304,
      message: 'Not logged in.',
      success: true,
    });
  })
);

module.exports = router;
