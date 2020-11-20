const router = require('express').Router();
const Incident = require('../models/Incident');

// constant list of arrests that qualify as victim arrests
const VICTIM_ARREST_FOCUSES = Object.freeze(['Prostitution Arrests or Stings']);

function getStatsFromArrests(arrests) {
  let victimArrestCount = 0;
  let totalArrestCount = arrests.length;

  if (arrests.length > 0) {
    victimArrestCount = arrests
      .filter((arrest) => VICTIM_ARREST_FOCUSES.includes(arrest.focus)).length;

    totalArrestCount += arrests
      .filter((arrest) => arrest.ptSentence === true).length;
  }

  let arrestScore = Number(
    (((totalArrestCount - victimArrestCount) / totalArrestCount) * 100).toFixed(2)
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

router.get('*', async (req, res) => {
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

module.exports = router;
