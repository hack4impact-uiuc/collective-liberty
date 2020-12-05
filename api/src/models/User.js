/** Schema representing a proposed/approved trafficking law */
const mongoose = require('mongoose');
const enums = require('./enums');

const User = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  userId: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: [enums.USER_ROLE.GUEST, enums.USER_ROLE.ADMIN],
    required: true,
  },
});

module.exports = mongoose.model('User', User);
