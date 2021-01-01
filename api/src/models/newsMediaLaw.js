/** Schema representing a proposed/approved trafficking law */
const mongoose = require('mongoose');

const NewsMediaLaw = new mongoose.Schema({
  city: { type: String, required: false },
  state: { type: String, required: true },
  focus: { type: String, required: true },
  lawAbout: { type: String, required: true },
  status: { type: String, required: true },
  notes: { type: String, required: false },
});

module.exports = mongoose.model('NewsMediaLaw', NewsMediaLaw);
