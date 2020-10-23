/** Schema representing a proposed/approved trafficking law */
const mongoose = require('mongoose');

const Law = new mongoose.Schema({
  city: { type: String, required: false },
  state: { type: String, required: false },
  focus: { type: String, required: false },
  traffickingType: { type: String, required: false },
  lawType: { type: String, required: false },
  status: { type: String, required: false },
  notes: { type: String, required: false },
});

module.exports = mongoose.model('Law', Law);
