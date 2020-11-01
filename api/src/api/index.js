const router = require('express').Router();
const incidents = require('./incidents');
const arrests = require('./arrests');

router.use('/incidents', incidents);
router.use('/arrests', arrests);

module.exports = router;
