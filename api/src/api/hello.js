const router = require('express').Router();

router.get('/say', (req, res) => {
  res.json({ to: 'you', msg: 'hello!' });
});

router.get('/bye', (req, res) => {
  res.json({ to: 'you', msg: 'bye' });
});

module.exports = router;
