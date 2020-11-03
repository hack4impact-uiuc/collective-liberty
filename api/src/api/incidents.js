const router = require('express').Router();
const Incident = require('../models/Incident');

router.get('*', async (req, res) => {
  const query = {};

  if (req.query.city) {
    query.city = req.query.city;
  }
  if (req.query.state) {
    query.state = req.query.state;
  }

  if (
    !isNaN(Number(req.query.start_date)) &&
    !isNaN(Number(req.query.end_date))
  ) {
    query.dateOfOperation = {
      $gte: new Date(req.query.start_date, 0, 1, 0, 0, 0, 0).getTime(),
    };
    query.endDateOfOperation = {
      $lte: new Date(req.query.end_date, 11, 31, 0, 0, 0, 0).getTime(),
    };
  }

  const incidents = await Incident.find(query);
  res.send(incidents);
});

module.exports = router;
