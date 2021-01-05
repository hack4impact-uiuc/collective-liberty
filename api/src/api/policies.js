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
    if (req.query.status) {
      query.status = req.query.status;
    }
    const newsMediaLaws = await NewsMediaLaw.find(query);
    res.send(newsMediaLaws);
  })
);

module.exports = router;
