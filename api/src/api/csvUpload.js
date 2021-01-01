const router = require('express').Router();
const multer = require('multer');
const csv = require('fast-csv');
const preprocess = require('../utils/preprocess');
const PreprocessedIncidentData = require('../models/preprocessedIncidentData');
const upload = multer();

const DATASET_TYPES = Object.freeze({
  Incidents: 'Incidents',
  Massage: 'Massage',
  Vacatur: 'Vacatur',
  NewsMedia: 'NewsMedia',
  Criminal: 'Criminal',
});

router.post('/', upload.single('file'), async function (req, res) {
  // This is how you access the dataset type, see UploadModal.jsx for possible values
  const dataset = req.body.dataset;
  let preprocessFn = null;

  switch (dataset) {
    case DATASET_TYPES.Incidents:
      return processIncidentsFile(req, res);
    case DATASET_TYPES.Massage:
      preprocessFn = preprocess.preprocessMassageLaw;
      break;
    case DATASET_TYPES.Vacatur:
      preprocessFn = preprocess.preprocessVacaturLaw;
      break;
    case DATASET_TYPES.NewsMedia:
      preprocessFn = preprocess.preprocessNewsMediaLaw;
      break;
    case DATASET_TYPES.Criminal:
      preprocessFn = preprocess.preprocessCriminalLaw;
      break;
    default:
      break;
  }

  // open uploaded file
  const file = req.file;

  csv
    .parseString(file.buffer.toString(), { headers: true })
    .on('data', function (row) {
      preprocessFn(row);
    })
    .on('end', function () {
      // save current data
      return res.status(200).json({});
    });
});

const processIncidentsFile = async (req, res) => {
  // open uploaded file
  const file = req.file;

  // remove previous incident data if it exists
  await PreprocessedIncidentData.findOneAndRemove({
    fileName: file.originalname,
  });

  // construct new data
  let currentFileData = {
    fileName: file.originalname,
    yearCounts: {},
    incidentTypeCounts: {},
    cityCounts: {},
    stateCounts: {},
  };

  csv
    .parseString(file.buffer.toString(), { headers: true })
    .on('data', function (row) {
      preprocess.reduceIncident(row, currentFileData);
    })
    .on('end', function () {
      // save current data
      const dbObj = new PreprocessedIncidentData(currentFileData);
      dbObj.save((err) => {
        if (err) {
          console.log(err);
          return;
        }
      });

      return res.status(200).json({});
    });
};

module.exports = router;
