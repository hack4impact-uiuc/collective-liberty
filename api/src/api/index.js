const router = require('express').Router();
const incidents = require('./incidents');

router.use('/incidents', incidents);

module.exports = router;
