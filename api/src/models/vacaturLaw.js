/** Schema representing a vacatur law */
const mongoose = require('mongoose');

const VacaturLaw = new mongoose.Schema({
  dataFileId: { type: String, required: true },
  state: { type: String, required: true },
  anyTypeCivilRemedy: { type: Boolean, required: true },
  offersVacatur: {
    type: String,
    enum: ['Yes', 'No', 'Juvenile Only'],
    required: true,
  },
  offersClemency: {
    type: String,
    enum: ['Yes', 'No', 'Juvenile Only'],
    required: true,
  },
  offersExpungement: {
    type: String,
    enum: ['Yes', 'No', 'Juvenile Only'],
    required: true,
  },
  rank: {
    type: String,
    enum: [
      'Excellent',
      'Good',
      'Fair',
      'Needs Improvement',
      'Bad',
      'Very Bad',
      'Kansas',
    ],
    required: true,
  },
});

module.exports = mongoose.model('VacaturLaw', VacaturLaw);
