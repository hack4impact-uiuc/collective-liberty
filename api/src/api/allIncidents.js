const router = require('express').Router();
const Incident = require('../models/Incident');

function getStatsFromArrests(arrests) {
  let totalArrestCounts = {};
  let stateMax = 0;
  let cityMaxesPerState = {};

  arrests.forEach((element) => {
    const cityIndex = `${element.city},${element.state}`;

    if (totalArrestCounts[element.state]) {
      totalArrestCounts[element.state] += 1;
    } else {
      totalArrestCounts[element.state] = 1;
    }

    if (totalArrestCounts[element.state] > stateMax) {
      stateMax = totalArrestCounts[element.state];
    }

    if (totalArrestCounts[cityIndex]) {
      totalArrestCounts[cityIndex] += 1;
    } else {
      totalArrestCounts[cityIndex] = 1;
    }

    if (cityMaxesPerState[element.state] !== undefined) {
      if (totalArrestCounts[cityIndex] > cityMaxesPerState[element.state]) {
        cityMaxesPerState[element.state] = totalArrestCounts[cityIndex];
      }
    } else {
      cityMaxesPerState[element.state] = 0;
    }
  });

  return {
    ...totalArrestCounts,
    _stateMax: stateMax,
    _cityMaxesPerState: cityMaxesPerState,
    _totalIncidents: arrests.length,
  };
}

router.get('*', async (req, res) => {
  const query = {};

  if (req.query.time_range) {
    const [startYear, endYear] = req.query.time_range;

    if (!isNaN(startYear) && !isNaN(endYear)) {
      query.dateOfOperation = {
        $gte: new Date(startYear, 0, 1, 0, 0, 0, 0).getTime(),
      };
      query.endDateOfOperation = {
        $lte: new Date(endYear, 11, 31, 0, 0, 0, 0).getTime(),
      };
    }
  }

  const arrests = await Incident.find(query);
  const stats = getStatsFromArrests(arrests);
  res.send(stats);
});

module.exports = router;
