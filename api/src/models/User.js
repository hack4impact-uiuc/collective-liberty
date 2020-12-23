/** Schema representing a proposed/approved trafficking law */
const mongoose = require('mongoose');
const enums = require('./enums');

const User = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userId: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: [enums.USER_ROLE.Guest, enums.USER_ROLE.Admin],
    required: true,
  },
});

module.exports = mongoose.model('User', User);
