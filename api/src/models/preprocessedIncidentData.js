/** Schema representing the preprocessed data from a single csv file */
const mongoose = require('mongoose');

const PreprocessedIncidentData = new mongoose.Schema({
  fileName: { type: String, required: true },
  yearCounts: { type: Map, of: String, required: false },  
  incidentTypeCounts: { type: Map, of: String, required: false  },
  cityCounts: { type: Map, of: String, required: false },
  stateCounts: { type: Map, of: String, required: false  },
});

module.exports = mongoose.model('PreprocessedIncidentData', PreprocessedIncidentData);
