/** Schema representing a criminal law */
const mongoose = require('mongoose');

const DataFile = new mongoose.Schema({
  fileName: { type: String, required: true },
  dataset: { type: String, required: true },
  dateUploaded: { type: Date, required: true },
});

module.exports = mongoose.model('DataFile', DataFile);
