const router = require('express').Router();
const adminOnly = require('../middleware/adminOnly');

const incidents = require('./incidents');
const arrests = require('./arrests');
const csvUpload = require('./csvUpload');
const allIncidents = require('./allIncidents');
const policies = require('./policies');
const login = require('./login');
const users = require('./users');
const getUserRole = require('./getUserRole');

router.use('/incidents', incidents);
router.use('/arrests', arrests);
router.use('/allincidents', allIncidents);
router.use('/policies', policies);
router.use('/login', login);
router.use('/getUserRole', getUserRole);

router.use('/users', adminOnly, users);
router.use('/csvUpload', adminOnly, csvUpload);

module.exports = router;
