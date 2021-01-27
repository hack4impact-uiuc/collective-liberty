const router = require('express').Router();
const adminOnly = require('../middleware/adminOnly');

const arrests = require('./arrests');
const csvUpload = require('./csvUpload');
const allIncidents = require('./allIncidents');
const policies = require('./policies');
const login = require('./login');
const logout = require('./logout');
const users = require('./users');
const getUserRole = require('./userRole');
const dataFiles = require('./dataFiles');

router.use('/arrests', arrests);
router.use('/allincidents', allIncidents);
router.use('/policies', policies);
router.use('/login', login);
router.use('/logout', logout);
router.use('/getUserRole', getUserRole);

router.use('/users', adminOnly, users);
router.use('/csvUpload', adminOnly, csvUpload);
router.use('/dataFiles', adminOnly, dataFiles);

module.exports = router;
