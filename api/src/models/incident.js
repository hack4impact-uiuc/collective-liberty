/** Schema representing a trafficking incident */
const mongoose = require("mongoose");

const Incident = new mongoose.Schema({
    focus: { type: String, required: true },
    caseTag: { type: String, required: true },
    dateOfOperation: { type: String, required: false },
    operationType: { type: String: required: false },
    city: { type: String, required: true },
    state: { type: String, required: false },
    criminalCharges: { type: Boolean, required: false },
    notes: { type: String, required: false }
});

module.exports = mongoose.model("Incident", Incident);
