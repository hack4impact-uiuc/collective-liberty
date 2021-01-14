const router = require('express').Router();
const multer = require('multer');
const csv = require('fast-csv');
const preprocess = require('../utils/preprocess');
const PreprocessedIncidentData = require('../models/preprocessedIncidentData');
const DataFile = require('../models/DataFile');
const upload = multer();
const constants = require('../utils/constants');
const errorWrap = require('../middleware/errorWrap');

router.post(
  '/',
  upload.single('file'),
  errorWrap(async function (req, res) {
    const file = req.file;
    // This is how you access the dataset type, see UploadModal.jsx for possible values
    const dataset = req.body.dataset;
    let preprocessRowFn = null;
    let validateRowFn = null;

    // create data file object
    const dataFile = new DataFile({
      fileName: file.originalname,
      dataset,
      dateUploaded: new Date(),
    });

    await dataFile.save();

    switch (dataset) {
      case constants.DATASET_TYPES.Incidents:
        return processIncidentsFile(req, res, dataFile._id);
      case constants.DATASET_TYPES.Massage:
        preprocessRowFn = preprocess.preprocessMassageLaw;
        validateRowFn = preprocess.isValidMassageLawRow;
        break;
      case constants.DATASET_TYPES.Vacatur:
        preprocessRowFn = preprocess.preprocessVacaturLaw;
        validateRowFn = preprocess.isValidVacaturLawRow;
        break;
      case constants.DATASET_TYPES.NewsMedia:
        preprocessRowFn = preprocess.preprocessNewsMediaLaw;
        validateRowFn = preprocess.isValidNewsMediaLawRow;
        break;
      case constants.DATASET_TYPES.Criminal:
        preprocessRowFn = preprocess.preprocessCriminalLaw;
        validateRowFn = preprocess.isValidCriminalLawRow;
        break;
      default:
        break;
    }

    // open uploaded file
    const invalidData = [];

    csv
      .parseString(file.buffer.toString(), { headers: true })
      .validate((row) => validateRowFn(row))
      .on('error', (error) => console.error(error))
      .on('data', function (row) {
        preprocessRowFn(dataFile._id, row);
      })
      .on('data-invalid', (row, rowNumber) => {
        invalidData.push({ row, rowNumber });
      })
      .on('end', async function () {
        if (invalidData.length > 0) {
          // remove datafile
          await DataFile.findByIdAndRemove(dataFile._id);

          return res.status(500).json({
            code: 500,
            message: `Invalid data found`,
            invalidData,
          });
        }

        // save current data
        return res.status(200).json({});
      });
  })
);

const processIncidentsFile = async (req, res, dataFileId) => {
  // open uploaded file
  const file = req.file;

  const yearCounts = {};
  for (let i = constants.ABS_START_YEAR; i <= constants.ABS_END_YEAR; i++) {
    yearCounts[i] = {
      stateCounts: {},
      cityCounts: {},
      incidentTypeCounts: {},
    };
  }

  // construct new data
  let currentFileData = {
    dataFileId,
    yearCounts,
  };

  const invalidData = [];

  csv
    .parseString(file.buffer.toString(), { headers: true })
    .validate((row) => preprocess.isValidIncidentRow(row))
    .on('error', (error) => console.error(error))
    .on('data', function (row) {
      preprocess.reduceIncident(row, currentFileData);
    })
    .on('data-invalid', (row, rowNumber) => {
      invalidData.push({ row, rowNumber });
    })
    .on('end', async function () {
      if (invalidData.length > 0) {
        // remove datafile
        await DataFile.findByIdAndRemove(dataFileId);

        return res.status(500).json({
          code: 500,
          message: `Invalid data found`,
          invalidData,
        });
      }

      // remove previous incident data if it exists
      await PreprocessedIncidentData.findOneAndRemove({
        dataFileId,
      });

      // save current data
      const dbObj = new PreprocessedIncidentData(currentFileData);
      await dbObj.save((err) => {
        if (err) {
          console.log(err);
          return;
        }
      });

      // refresh abs data
      preprocess.refreshAbsoluteData();

      return res.status(200).json({});
    });
};

module.exports = router;
