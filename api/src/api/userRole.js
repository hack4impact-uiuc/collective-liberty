const router = require('express').Router();
const errorWrap = require('../middleware/errorWrap');
const USER_ROLE = require('../models/enums').USER_ROLE;

router.get(
  '/',
  errorWrap(async (req, res) => {
    res.send({ role: req.user ? req.user.role : USER_ROLE.Guest });
  })
);

module.exports = router;
