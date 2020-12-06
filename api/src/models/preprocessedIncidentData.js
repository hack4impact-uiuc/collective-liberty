/** Schema representing the preprocessed data from a single csv file */
const mongoose = require('mongoose');

const PreprocessedIncidentData = new mongoose.Schema({
  fileName: { type: String, required: true },
  yearCounts: { type: Dictionary, schema: { year: Number,
      count: Number }, required: false },  
  incidentTypeCounts: { type: Dictionary, schema: { incidentType: String,
      count: Number }, required: false  },
  cityCounts: { type: Dictionary, schema: { city: String,
      count: Number }, required: false },
  stateCounts: { type: Dictionary, schema: { state: String,
      count: Number }, required: false  },
});

module.exports = mongoose.model('PreprocessedIncidentData', PreprocessedIncidentData);
