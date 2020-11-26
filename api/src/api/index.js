const router = require('express').Router();
const incidents = require('./incidents');
const arrests = require('./arrests');
const allIncidents = require('./allIncidents');
const policies = require('./policies');

router.use('/incidents', incidents);
router.use('/arrests', arrests);
router.use('/allincidents', allIncidents);
router.use('/policies', policies);

module.exports = router;
