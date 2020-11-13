const router = require('express').Router();
const incidents = require('./incidents');
const arrests = require('./arrests');
const csvUpload = require('./csvUpload');

router.use('/incidents', incidents);
router.use('/arrests', arrests);
router.use('/csvUpload', csvUpload);

module.exports = router;
