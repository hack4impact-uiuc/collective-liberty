const router = require('express').Router();
const Incident = require('../models/Incident');
const errorWrap = require('../middleware/errorWrap');
const stats = require('../utils/stats');
const preprocess = require('../utils/preprocess');

router.get(
  '/stats',
  errorWrap(async (req, res) => {
    const query = {};
    let years = [];

    if (req.query.city) {
      query.city = req.query.city;
    }
    if (req.query.state) {
      query.state = req.query.state;
    }
    if (req.query.time_range) {
      const [startYear, endYear] = req.query.time_range
        .split(',')
        .map((elem) => Number(elem));

      years = await preprocess.fetchAggregateDataInRange(startYear, endYear);
    }

    const result = stats.getStatsFromIncidents(years, query);
    res.send(result);
  })
);

router.get(
  '/yearlyData',
  errorWrap(async (req, res) => {
    const query = {};
    const yearlyData = [];

    if (req.query.city) {
      query.city = req.query.city;
    }
    if (req.query.state) {
      query.state = req.query.state;
    }
    if (req.query.focus) {
      query.focus = req.query.focus;
    }
    if (req.query.time_range) {
      const [startYear, endYear] = req.query.time_range;

      if (!isNaN(startYear) && !isNaN(endYear)) {
        const years = await preprocess.fetchAggregateDataInRange(
          startYear,
          endYear
        );

        years.forEach((year) => {
          const result = stats.getStatsFromIncidents([year], query);

          yearlyData.push(
            req.query.total_case_count === 'true'
              ? result.totalCaseCount
              : result.traffickerArrestCount || 0
          );
        });
      }
    }

    res.send(yearlyData);
  })
);

module.exports = router;
