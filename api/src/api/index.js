const router = require('express').Router();
const incidents = require('./incidents');
const arrests = require('./arrests');
const allIncidents = require('./allIncidents');

router.use('/incidents', incidents);
router.use('/arrests', arrests);
router.use('/allincidents', allIncidents);

module.exports = router;
