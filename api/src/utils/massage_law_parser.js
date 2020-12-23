/*
 * this script is used to parse the provided
 * mock massage parlor laws
 */

const XLSX = require('xlsx');
const path = require('path');
const mongoose = require('mongoose');
const MassageLaw = require('../models/massageLaw');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function main() {
  const workbook = XLSX.readFile(path.join(__dirname, './massage_laws.xlsx'));
  const worksheet = workbook.Sheets[workbook.SheetNames[0]].concat(
    workbook.Sheets[workbook.SheetNames[1]]
  );

  const json = XLSX.utils.sheet_to_json(worksheet);

  for (const law of json) {
    let newLaw = new MassageLaw({
      city: law['City'] || '',
      state: law['State'] || law['State '],
      strengthOfLaw:
        law['Strength of Current City Laws'] || law['Strength of State Laws'],
    });

    newLaw.save();
  }
}

main();
