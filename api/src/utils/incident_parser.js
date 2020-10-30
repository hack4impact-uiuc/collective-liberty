/*
 * this script is used to parse the provided
 * mock data for incidents of human trafficking
 */

const XLSX = require('xlsx');
const path = require('path');
const mongoose = require('mongoose');
const Incident = require('../models/Incident');
const dateParser = require('./date_parser');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function main() {
  const workbook = XLSX.readFile(path.join(__dirname, './incidents.xlsx'));
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  const json = XLSX.utils.sheet_to_json(worksheet);

  for (const incident of json) {
    const dateOfOperationStrs = dateParser.parse(incident['Date of Operation']);
    let dateOfOperation = new Date('1/1/2000').getTime();
    let endDateOfOperation = dateOfOperation;

    if (dateOfOperationStrs.length > 0) {
      dateOfOperation = new Date(dateOfOperationStrs[0]).getTime();
      endDateOfOperation = dateOfOperation;

      if (dateOfOperationStrs.length > 1) {
        endDateOfOperation = new Date(dateOfOperationStrs[1]).getTime();
      }
    }

    let newIncident = new Incident({
      focus: incident['Content/Focus'],
      caseTag: incident['Case Tag'],
      dateOfOperation,
      endDateOfOperation,
      operationType: incident['Operation Type'],
      city: incident['Business City'],
      state: incident['Business State'],
      notes: incident['Notes'],
    });

    newIncident.save();
  }
}

main();
