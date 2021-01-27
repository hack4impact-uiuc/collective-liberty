const router = require('express').Router();
const errorWrap = require('../middleware/errorWrap');

router.get(
  '/',
  errorWrap(async (req, res) => {
    res.send({ role: req.user && req.user.role });
  })
);

module.exports = router;
