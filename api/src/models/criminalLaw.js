/** Schema representing a criminal law */
const mongoose = require('mongoose');

const CriminalLaw = new mongoose.Schema({
  stateTerritory: { type: String, required: true },
  datePassed: { type: Date, required: true },
  summary: { type: String, required: true },
});

module.exports = mongoose.model('CriminalLaw', CriminalLaw);
