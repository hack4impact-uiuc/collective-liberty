const router = require('express').Router();
const Incident = require('../models/Incident');

// constant list of arrests that qualify as victim arrests
const VICTIM_ARREST_FOCUSES = Object.freeze(['Prostitution Arrests or Stings']);

function getStatsFromArrests(arrests) {
  let victimArrestCount = 0;
  let totalArrestCount = arrests.length;

  if (arrests.length > 0) {
    arrests.forEach((arrest) => {
      if (VICTIM_ARREST_FOCUSES.includes(arrest.focus)) {
        victimArrestCount++;
      }

      if (arrest.ptSentence) {
        totalArrestCount++;
      }
    });
  }

  let arrestScore = Number(
    (((totalArrestCount - victimArrestCount) / totalArrestCount) * 100).toFixed(
      2
    )
  );

  if (isNaN(arrestScore)) {
    arrestScore = -1;
  }

  return {
    arrestScore,
    victimArrestCount,
    traffickerArrestCount: totalArrestCount - victimArrestCount,
    totalCaseCount: totalArrestCount,
  };
}

router.get('/stats', async (req, res) => {
  const query = {};

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

router.get('/yearlyData', async (req, res) => {
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
        const stats = getStatsFromArrests(arrests);

        yearlyData.push(
          req.query.total_case_count === 'true'
            ? stats.totalCaseCount
            : stats.traffickerArrestCount || 0
        );
      }
    }
  }

  res.send(yearlyData);
});

module.exports = router;
