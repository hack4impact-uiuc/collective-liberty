const api = require('./api');
const router = require('express').Router();

router.use('/api', api);

module.exports = router;
