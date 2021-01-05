const router = require('express').Router();
const errorWrap = require('../middleware/errorWrap');
const DataFile = require('../models/DataFile');
const DATASET_TYPES = require('../utils/constants').DATASET_TYPES;
const CriminalLaw = require('../models/criminalLaw');
const VacaturLaw = require('../models/vacaturLaw');
const MassageLaw = require('../models/massageLaw');
const NewsMediaLaw = require('../models/newsMediaLaw');
const PreprocessedIncidentData = require('../models/preprocessedIncidentData');
const preprocess = require('../utils/preprocess');

router.get(
  '/',
  errorWrap(async (req, res) => {
    const files = await DataFile.find({});
    res.send(files);
  })
);

router.post(
  '/',
  errorWrap(async (req, res) => {
    // remove all data that belonged to file
    const dataFileId = req.body._id;
    const dataFile = await DataFile.findById(dataFileId);

    switch (dataFile.dataset) {
      case DATASET_TYPES.Incidents:
        await PreprocessedIncidentData.deleteOne({ dataFileId });
        preprocess.refreshAbsoluteData();
        break;
      case DATASET_TYPES.Massage:
        await MassageLaw.deleteMany({ dataFileId });
        break;
      case DATASET_TYPES.Vacatur:
        await VacaturLaw.deleteMany({ dataFileId });
        break;
      case DATASET_TYPES.NewsMedia:
        await NewsMediaLaw.deleteMany({ dataFileId });
        break;
      case DATASET_TYPES.Criminal:
        await CriminalLaw.deleteMany({ dataFileId });
        break;
      default:
        break;
    }

    // delete data file
    DataFile.findByIdAndDelete(dataFileId, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          code: 500,
          message: err,
        });
      } else {
        res.status(200).json({ code: 200 });
      }
    });
  })
);

module.exports = router;
