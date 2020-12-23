/*
 * this script is used to parse the provided
 * mock criminal laws
 */

const XLSX = require('xlsx');
const path = require('path');
const mongoose = require('mongoose');
const CriminalLaw = require('../models/criminalLaw');
const dateParser = require('./date_parser');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function main() {
  const workbook = XLSX.readFile(path.join(__dirname, './criminal_laws.xlsx'));
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  const json = XLSX.utils.sheet_to_json(worksheet);

  for (const law of json) {
    const dateOfOperationStrs = dateParser.parse(
      law['Date First Passed']?.toString()
    );
    let datePassed = new Date('1/1/2000').getTime();

    if (dateOfOperationStrs.length > 0) {
      datePassed = new Date(dateOfOperationStrs[0]).getTime();
    }

    let newLaw = new CriminalLaw({
      stateTerritory: law['State/Territory'],
      datePassed,
      summary: law['Summary'] || '',
    });

    newLaw.save();
  }
}

main();
