/** Schema representing a massage law **/
const mongoose = require('mongoose');

const MassageLaw = new mongoose.Schema({
  state: { type: String, required: true },
  city: { type: String, required: false },
  strengthOfLaw: { type: String, required: true },
});

module.exports = mongoose.model('MassageLaw', MassageLaw);
