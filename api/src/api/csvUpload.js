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
    const file = req.file;
    // This is how you access the dataset type, see UploadModal.jsx for possible values
    const dataset = req.body.dataset;
    let preprocessFn = null;

    // create data file object
    const dataFile = new DataFile({
      fileName: file.originalname,
      dataset,
      dateUploaded: new Date(),
    });

    await dataFile.save();

    switch (dataset) {
      case DATASET_TYPES.Incidents:
        return processIncidentsFile(req, res, dataFile._id);
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

const processIncidentsFile = async (req, res, dataFileId) => {
  // open uploaded file
  const file = req.file;

  // remove previous incident data if it exists
  await PreprocessedIncidentData.findOneAndRemove({
    dataFileId,
  });

  // construct new data
  let currentFileData = {
    dataFileId,
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
      preprocess.refreshAbsoluteData();

      return res.status(200).json({});
    });
};

module.exports = router;
