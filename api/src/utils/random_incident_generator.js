/*
 * this script is used to parse the provided
 * mock data for incidents of human trafficking
 */

const XLSX = require('xlsx');
const path = require('path');
const mongoose = require('mongoose');
const Incident = require('../models/Incident');
const PreprocessedIncidentData = require('../models/preprocessedIncidentData');
const preprocess = require('./preprocess');

const AMOUNT = 500;
const FOCUSES = [
  'Massage Parlor Trafficking',
  'Prostitution Arrests or Stings',
  'Human Trafficking Arrests',
];
const OP_TYPE = ['dbsa', 'cfv', 'swbp', 'hbsw', 'ba', 'rb', 'other'];
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

const main = async () => {
  const workbook = XLSX.readFile(path.join(__dirname, './uscities_500.xlsx'));
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

  await PreprocessedIncidentData.findOneAndRemove({
    fileName: 'random',
  });

  // construct new data
  const data = {
    fileName: 'random',
    yearCounts: {},
    incidentTypeCounts: {},
    cityCounts: {},
    stateCounts: {},
  };

  for (let i = 0; i < AMOUNT; i++) {
    const state = getRandomElement(states);
    const city = getRandomElement(cities[state]);
    const date = getRandomDate().toLocaleDateString();

    preprocess.reduceIncident(
      {
        'Content/Focus': getRandomElement(FOCUSES),
        // 'Case Tag':
        //   city +
        //   '_' +
        //   date.replace(/[/]+/g, '.'),
        'Date of Operation': date,
        // operationType: getRandomElement(OP_TYPE),
        'Business City': city.replace(/[.]+/g, ''),
        'Business State': state,
        // notes: getRandomElement(NOTES),
        'PT Sentence': Math.random() >= 0.5,
      },
      data
    );
  }

  const dbObj = new PreprocessedIncidentData(data);
  dbObj.save();
};

main();
