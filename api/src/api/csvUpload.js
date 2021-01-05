const router = require('express').Router();
const multer = require('multer');
const csv = require('fast-csv');
const preprocess = require('../utils/preprocess');
const PreprocessedIncidentData = require('../models/preprocessedIncidentData');
const DataFile = require('../models/DataFile');
const upload = multer();
const DATASET_TYPES = require('../utils/constants').DATASET_TYPES;
const errorWrap = require('../middleware/errorWrap');

router.post(
  '/',
  upload.single('file'),
  errorWrap(async function (req, res) {
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

    // create data file object
    const dataFile = new DataFile({
      fileName: file.originalname,
      dataset,
      dateUploaded: new Date(),
    });

    await dataFile.save();

    csv
      .parseString(file.buffer.toString(), { headers: true })
      .on('data', function (row) {
        preprocessFn(dataFile._id, row);
      })
      .on('end', function () {
        // save current data
        return res.status(200).json({});
      });
  })
);

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
  };

  csv
    .parseString(file.buffer.toString(), { headers: true })
    .on('data', function (row) {
      preprocess.reduceIncident(row, currentFileData);
    })
    .on('end', async function () {
      // save current data
      const dbObj = new PreprocessedIncidentData(currentFileData);
      await dbObj.save((err) => {
        if (err) {
          console.log(err);
          return;
        }
      });

      // refresh abs data
      refreshAbsoluteData();

      return res.status(200).json({});
    });
};

const refreshAbsoluteData = async () => {
  await PreprocessedIncidentData.findOneAndRemove({
    fileName: preprocess.AGGREGATE_INCIDENT_DATA_FILE_NAME,
  });

  // construct new data
  let newAbsData = {
    fileName: preprocess.AGGREGATE_INCIDENT_DATA_FILE_NAME,
    yearCounts: {},
  };

  const allData = await PreprocessedIncidentData.find({});
  allData.forEach((data) => {
    if (data.fileName !== preprocess.AGGREGATE_INCIDENT_DATA_FILE_NAME) {
      preprocess.applyActionToPreprocessedData(
        newAbsData,
        data,
        preprocess.PREPROCESSED_DATA_ACTIONS.Add
      );
    }
  });

  const dbObj = new PreprocessedIncidentData(newAbsData);
  await dbObj.save();
};

module.exports = router;
