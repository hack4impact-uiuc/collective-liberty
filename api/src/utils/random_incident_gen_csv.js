/*
 * this script is used to parse the provided
 * mock data for incidents of human trafficking
 */

const XLSX = require('xlsx');
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: path.join(__dirname, './random_incidents.csv'),
  header: [
    { id: 'Content/Focus', title: 'Content/Focus' },
    { id: 'Date of Operation', title: 'Date of Operation' },
    { id: 'Business State', title: 'Business State' },
    { id: 'PT Sentence', title: 'PT Sentence' },
    { id: 'Business City', title: 'Business City' },
  ],
});

const AMOUNT = 500;
const FOCUSES = [
  'Massage Parlor Trafficking',
  'Prostitution Arrests or Stings',
  'Human Trafficking Arrests',
];
const ABS_START_DATE = new Date('1/01/2000').getTime();
const ABS_END_DATE = new Date('10/1/2020').getTime();
const FILE_NAME = 'random_incidents_autogen';

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
  const records = [];

  for (let i = 0; i < AMOUNT; i++) {
    const state = getRandomElement(states);
    const city = getRandomElement(cities[state]);
    const date = getRandomDate().toLocaleDateString();

    records.push({
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
    });
  }

  await csvWriter.writeRecords(records); // returns a promise
  console.log('Done');

  process.exit();
};

main();
