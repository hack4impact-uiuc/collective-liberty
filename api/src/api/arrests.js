const router = require('express').Router();
const Incident = require('../models/Incident');
const errorWrap = require('../middleware/errorWrap');
const stats = require('../utils/stats');
const preprocess = require('../utils/preprocess');

// constant list of arrests that qualify as victim arrests
const VICTIM_ARREST_FOCUSES = Object.freeze(['Prostitution Arrests or Stings']);

router.get(
  '/stats',
  errorWrap(async (req, res) => {
    let years = [];
    let city = undefined;
    let state = undefined;

    if (req.query.city) {
      city = req.query.city;
    }
    if (req.query.state) {
      state = req.query.state;
    }
    if (req.query.time_range) {
      const [startYear, endYear] = req.query.time_range
        .split(',')
        .map((elem) => Number(elem));

      years = await preprocess.fetchAggregateDataInRange(startYear, endYear);
      // const  = stats.flattenIncidents(years)
      // TODO: add city/state breakdown in incident types to accurately deliver score
    }

    const result = stats.getStatsFromIncidents(years);
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
        for (let year = startYear; year <= endYear; year++) {
          query.dateOfOperation = {
            $gte: new Date(year, 0, 1, 0, 0, 0, 0).getTime(),
            $lte: new Date(year, 11, 31, 0, 0, 0, 0).getTime(),
          };

          const arrests = await Incident.find(query);
          const result = stats.getStatsFromArrests(arrests);

          yearlyData.push(
            req.query.total_case_count === 'true'
              ? result.totalCaseCount
              : result.traffickerArrestCount || 0
          );
        }
      }
    }

    res.send(yearlyData);
  })
);

module.exports = router;
