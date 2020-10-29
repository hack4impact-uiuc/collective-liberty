/** Schema representing a trafficking incident */
const mongoose = require('mongoose');

const Incident = new mongoose.Schema({
  focus: { type: String, required: true },
  caseTag: { type: String, required: true },
  dateOfOperation: { type: Number, required: false },
  endDateOfOperation: { type: Number, required: false },
  operationType: { type: String, required: false },
  city: { type: String, required: true },
  state: { type: String, required: false },
  notes: { type: String, required: false },
});

module.exports = mongoose.model('Incident', Incident);
