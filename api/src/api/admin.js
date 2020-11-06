const router = require('express').Router();

router.put('*', async (req, res) => {
  console.log(res.data.file);
  res.send('done');
});

module.exports = router;
