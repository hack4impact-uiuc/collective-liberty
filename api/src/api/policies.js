const router = require('express').Router();
const Law = require('../models/Law');

router.get('*', async (req, res) => {
    const laws = await Law.find(req.query);
    res.send(laws);
});

module.exports = router;