/** Schema representing a proposed/approved trafficking law */
const mongoose = require('mongoose');

const User = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  userId: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('User', User);
