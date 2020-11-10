const router = require('express').Router();
const Incident = require('../models/Incident');

// constant list of arrests that qualify as victim arrests
const VICTIM_ARREST_FOCUSES = Object.freeze(['Prostitution Arrests or Stings']);

function getStatsFromArrests(arrests) {
  let stateTotalArrest = {};

  arrests.forEach((element) => {
    if (stateTotalArrest[element.state]) {
      stateTotalArrest[element.state] += 1;
    } else {
      stateTotalArrest[element.state] = 1;
    }
  });

  return {
    ...stateTotalArrest,
    _totalIncidents: arrests.length,
  };
}

router.get('*', async (req, res) => {
  const query = {};
  console.log(req.query);
  if (req.query.time_range) {
    const [startYear, endYear] = req.query.time_range;
    //.split(',')
    //.map((elem) => Number(elem));

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
