const router = require('express').Router();
const incidents = require('./incidents');
const arrests = require('./arrests');
const admin = require('./admin');

router.use('/incidents', incidents);
router.use('/arrests', arrests);
router.use('/admin', admin);

module.exports = router;
