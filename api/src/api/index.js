const router = require('express').Router();
const incidents = require('./incidents');
const arrests = require('./arrests');
const csvUpload = require('./csvUpload');
const allIncidents = require('./allIncidents');
const policies = require('./policies');

router.use('/incidents', incidents);
router.use('/arrests', arrests);
router.use('/allincidents', allIncidents);
router.use('/policies', policies);
router.use('/csvUpload', csvUpload);

module.exports = router;
