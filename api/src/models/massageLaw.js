/** Schema representing a massage law **/
const mongoose = require('mongoose');

const MassageLaw = new mongoose.Schema({
  state: { type: String, required: false },
  city: { type: String, required: false },
  strengthOfStateLaw: { type: String, required: false },
  codeLink: { type: String, required: false },
  codeSection: { type: String, required: false },
});

module.exports = mongoose.model('MassageLaw', MassageLaw);

