/*
 * this script is used to parse the provided
 * mock data for trafficker arrests related to human trafficking
 */

const XLSX = require('xlsx');
const path = require('path');
const mongoose = require('mongoose');
const Incident = require('../models/Incident');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function main() {
  const workbook = XLSX.readFile(path.join(__dirname, './incidents.xlsx'));
  const worksheet = workbook.Sheets[workbook.SheetNames[4]];

  const json = XLSX.utils.sheet_to_json(worksheet);

  for (const incident of json) {
    let newIncident = new Incident({
      focus: incident['Content/Focus'],
      caseTag: incident['Case Tag'],
      dateOfOperation: incident['Date of Operation'],
      endDateOfOperation: incident['Date of Operation'],
      operationType: incident['Business Type'],
      city: incident['Business City'],
      state: incident['Business State'],
      notes: incident["Add'l Note"],
      ptSentence: incident['PT Sentence'] === 'Yes' ? true : false,
    });

    newIncident.save();
  }
}

main();
