const router = require('express').Router();
const preprocess = require('../utils/preprocess');
const errorWrap = require('../middleware/errorWrap');
const stats = require('../utils/stats');

router.get(
  '*',
  errorWrap(async (req, res) => {
    let years = [];

    if (req.query.time_range) {
      const [startYear, endYear] = req.query.time_range;
      years = await preprocess.fetchAggregateDataInRange(startYear, endYear);
    }

    const result = stats.aggregateIncidentInfo(years);
    res.send(result);
  })
);

module.exports = router;
