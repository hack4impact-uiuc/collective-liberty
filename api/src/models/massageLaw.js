/** Schema representing a massage law **/
const mongoose = require('mongoose');

const MassageLaw = new mongoose.Schema({
  state: { type: String, required: false },
  city: { type: String, required: false },
  strengthOfLaw: { type: String, required: false },
});

module.exports = mongoose.model('MassageLaw', MassageLaw);

