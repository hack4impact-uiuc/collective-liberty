const router = require('express').Router();
const preprocess = require('../utils/preprocess');
const errorWrap = require('../middleware/errorWrap');

function aggregateIncidentInfo(years) {
  let totalArrestCounts = {};
  let stateMax = 0;
  let cityMaxesPerState = {};
  let totalIncidents = 0;

  years.forEach((year) => {
    Object.entries(year.stateCounts).forEach(([index, num]) => {
      if (!totalArrestCounts[index]) {
        totalArrestCounts[index] = num;
      } else {
        totalArrestCounts[index] += num;
      }

      // get state max
      if (totalArrestCounts[index] > stateMax) {
        stateMax = totalArrestCounts[index];
      }

      totalIncidents += num;
    });

    Object.entries(year.cityCounts).forEach(([index, num]) => {
      if (!totalArrestCounts[index]) {
        totalArrestCounts[index] = num;
      } else {
        totalArrestCounts[index] += num;
      }

      // get city max per state
      const state = index.split(',')[1];
      if (cityMaxesPerState[state] !== undefined) {
        if (totalArrestCounts[index] > cityMaxesPerState[state]) {
          cityMaxesPerState[state] = totalArrestCounts[index];
        }
      } else {
        cityMaxesPerState[state] = 0;
      }
    });
  });

  return {
    ...totalArrestCounts,
    _stateMax: stateMax,
    _cityMaxesPerState: cityMaxesPerState,
    _totalIncidents: totalIncidents,
  };
}

router.get(
  '*',
  errorWrap(async (req, res) => {
    const years = [];

    if (req.query.time_range) {
      const [startYear, endYear] = req.query.time_range;

      if (!isNaN(startYear) && !isNaN(endYear)) {
        const data = await preprocess.fetchAggregateData();

        for (let i = startYear; i <= endYear; i++) {
          years.push(data.yearCounts[i]);
        }
      }
    }

    const stats = aggregateIncidentInfo(years);
    res.send(stats);
  })
);

module.exports = router;
