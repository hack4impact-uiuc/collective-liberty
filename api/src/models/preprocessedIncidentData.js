/** Schema representing the preprocessed data from a single csv file */
const mongoose = require('mongoose');

const PreprocessedIncidentData = new mongoose.Schema({
  fileName: { type: String, required: true },
  yearCounts: {
    type: Object,
    of: {
      incidentTypeCounts: {
        type: Object,
        of: mongoose.SchemaTypes.Mixed,
        required: false,
      },
      cityCounts: { type: Object, of: Number, required: false },
      stateCounts: { type: Object, of: Number, required: false },
    },
  },
});

module.exports = mongoose.model(
  'PreprocessedIncidentData',
  PreprocessedIncidentData
);
