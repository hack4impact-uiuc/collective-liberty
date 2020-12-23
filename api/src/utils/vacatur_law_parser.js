/*
 * this script is used to parse the provided
 * mock vacatur laws
 */

const XLSX = require('xlsx');
const path = require('path');
const mongoose = require('mongoose');
const VacaturLaw = require('../models/vacaturLaw');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function main() {
  const workbook = XLSX.readFile(path.join(__dirname, './vacatur_laws.xlsx'));
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  const json = XLSX.utils.sheet_to_json(worksheet);

  for (const law of json) {
    let newLaw = new VacaturLaw({
      state: law['State'],
      anyTypeCivilRemedy: law['Any Tye of Civil Remedy'] === 'Yes',
      offersVacatur: law['Offers Vacatur'] || 'No',
      offersClemency: law['Offers Clemency'] || 'No',
      offersExpungement: law['Offers Expungement'] || 'No',
      rank: law['Rank'],
    });

    newLaw.save();
  }
}

main();
