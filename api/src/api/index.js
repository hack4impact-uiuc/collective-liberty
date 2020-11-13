const router = require('express').Router();
const incidents = require('./incidents');
const arrests = require('./arrests');
const admin = require('./admin');
const allIncidents = require('./allIncidents');

router.use('/incidents', incidents);
router.use('/arrests', arrests);
router.use('/allincidents', allIncidents);
router.use('/admin', admin);

module.exports = router;
