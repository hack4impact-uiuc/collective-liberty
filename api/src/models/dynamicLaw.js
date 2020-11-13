/** Schema representing a dynamic law */
const mongoose = require('mongoose');

const DynamicLaw = new mongoose.Schema({
  stage: { type: String, required: false },
  city: { type: String, required: false },
  type: { type: String, required: false },
});

module.exports = mongoose.model('DynamicLaw', DynamicLaw);
