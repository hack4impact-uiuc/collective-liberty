/** Schema representing the preprocessed data from a single csv file */
const mongoose = require('mongoose');
const enums = require('./enums');

const PreprocessedCount = new mongoose.Schema({
  dataFileId: { type: String, required: true },
  year: { type: Number, required: true },
  type: {
    type: String,
    enum: [
      enums.PREPROCESSED_COUNT_TYPES.IncidentType,
      enums.PREPROCESSED_COUNT_TYPES.City,
      enums.PREPROCESSED_COUNT_TYPES.State,
    ],
    required: true,
  },
  values: {
    type: Object,
  },
});

module.exports = mongoose.model('PreprocessedCount', PreprocessedCount);
