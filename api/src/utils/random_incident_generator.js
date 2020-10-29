/*
 * this script is used to parse the provided
 * mock data for incidents of human trafficking
 */

const XLSX = require('xlsx');
const path = require('path');
const mongoose = require('mongoose');
const Incident = require('../models/Incident');

const AMOUNT = 100;
const FOCUSES = [
  'Massage Parlor Trafficking',
  'Prostitution Arrests or Stings',
  'Human Trafficking Arrests',
];
const OP_TYPE = [
  'digital-based sex acts (like cam girl, pornography, phone sex)',
  'commercial front venue (like massage parlors, cantinas, strip clubs, etc.)',
  'street-work based prostitution',
  'hotel-based sex work/prostitution',
  'buyer arrests (was the buyer arrested?)',
  'residential brothel (RB)',
  'other (see notes)',
];
const NOTES = [
  'lorem ipsum dolor sit amet consectetur adipiscing elit',
  'sed do eiusmod tempor incididunt ut labore et dolore',
  'magna aliqua ut enim ad minim veniam quis nostrud',
  'exercitation ullamco laboris nisi ut aliquip ex ea',
  'commodo consequat duis aute irure dolor in',
];
const ABS_START_DATE = new Date('1/01/2000').getTime();
const ABS_END_DATE = new Date('10/1/2020').getTime();

mongoose.connect('mongodb://127.0.0.1:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const getRandomElement = (arr) =>
  arr[Math.floor(Math.random() * (arr.length - 1))];
const getRandomDate = () =>
  new Date(
    Math.floor(Math.random() * (ABS_END_DATE - ABS_START_DATE) + ABS_START_DATE)
  );

const main = () => {
  const workbook = XLSX.readFile(path.join(__dirname, './uscities.xlsx'));
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const sheetJson = XLSX.utils.sheet_to_json(sheet);

  const cities = {};

  sheetJson.forEach((entry) => {
    if (cities[entry.state_name] === undefined) {
      cities[entry.state_name] = [entry.city];
    } else {
      cities[entry.state_name].push(entry.city);
    }
  });

  const states = Object.keys(cities);

  for (let i = 0; i < AMOUNT; i++) {
    const state = getRandomElement(states);
    const city = getRandomElement(cities[state]);
    const date1 = getRandomDate();
    const date2 = getRandomDate();
    const dateOfOperation = new Date(
      Math.min(date1.getTime(), date2.getTime())
    ).toLocaleDateString();

    const newIncident = new Incident({
      focus: getRandomElement(FOCUSES),
      caseTag: city + '_' + dateOfOperation.replace(/[/]+/g, '.'),
      dateOfOperation: dateOfOperation,
      endDateOfOperation: new Date(
        Math.max(date1.getTime(), date2.getTime())
      ).toLocaleDateString(),
      operationType: getRandomElement(OP_TYPE),
      city,
      state,
      notes: getRandomElement(NOTES),
    });

    newIncident.save();
  }
};

main();
