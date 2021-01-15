const router = require('express').Router();
const VacaturLaw = require('../models/vacaturLaw');
const CriminalLaw = require('../models/criminalLaw');
const MassageLaw = require('../models/massageLaw');
const NewsMediaLaw = require('../models/newsMediaLaw');
const errorWrap = require('../middleware/errorWrap');

router.get(
  '/vacaturLaws',
  errorWrap(async (req, res) => {
    const query = {};
    if (req.query.state) {
      query.state = req.query.state;
    }
    const vacaturLaws = await VacaturLaw.find(query);
    res.send(vacaturLaws);
  })
);

router.get(
  '/criminalLaws',
  errorWrap(async (req, res) => {
    const query = {};
    if (req.query.stateTerritory) {
      query.stateTerritory = req.query.stateTerritory;
    }
    const criminalLaws = await CriminalLaw.find(query);
    res.send(criminalLaws);
  })
);

router.get(
  '/massageLaws',
  errorWrap(async (req, res) => {
    const query = {};
    if (req.query.state) {
      query.state = req.query.state;
    }
    if (req.query.city) {
      query.city = req.query.city;
    }
    const massageLaws = await MassageLaw.find(query);
    res.send(massageLaws);
  })
);

router.get(
  '/newsMediaLaws',
  errorWrap(async (req, res) => {
    const query = {};

    if (req.query.state) {
      query.state = req.query.state;
    }
    if (req.query.city) {
      query.city = req.query.city;
    }
    if (req.query.focus) {
      query.focus = req.query.focus;
    }
    if (req.query.lawAbout) {
      query.lawAbout = req.query.lawAbout;
    }
    if (req.query.status) {
      query.status = req.query.status;
    }

    let laws = [];

    if (req.query.lawAboutList) {
      const resList = await Promise.all(
        req.query.lawAboutList.map((lawAbout) =>
          NewsMediaLaw.find({ ...query, lawAbout })
        )
      );

      laws = resList.reduce(
        (list, fetchResult) => list.concat(fetchResult),
        []
      );
    } else {
      laws = await NewsMediaLaw.find(query);
    }

    if (req.query.amount) {
      // randomly select
      // (when dates are added, space selections by a random amount of years)
      const amount = req.query.amount;
      const lawsLen = laws.length;
      if (lawsLen <= amount) return res.send(laws);

      const selected = [];
      const seen = {};

      for (let i = 0; i < amount; i++) {
        let index = Math.floor(Math.random() * (lawsLen - 1));

        if (!seen[index]) {
          selected.push(laws[index]);
          seen[index] = true;
        }
      }

      console.log(selected);

      return res.send(selected);
    }

    res.send(laws);
  })
);

module.exports = router;
