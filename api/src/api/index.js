const router = require('express').Router();
const hello = require('./hello');

router.use('/hello', hello);

module.exports = router;
