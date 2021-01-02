const dateParser = require('./date_parser');
const CriminalLaw = require('../models/criminalLaw');
const VacaturLaw = require('../models/vacaturLaw');
const MassageLaw = require('../models/massageLaw');
const NewsMediaLaw = require('../models/newsMediaLaw');
const PreprocessedIncidentData = require('../models/preprocessedIncidentData');
const stateAbbreviations = require('../utils/stateAbbreviations');

// aggregated data of all current files uploaded.
const AGGREGATE_INCIDENT_DATA_FILE_NAME = 'AGGREGATE';
const PREPROCESSED_DATA_ACTIONS = Object.freeze({
  Add: 'Add',
  Sub: 'Sub',
});
// https://stackoverflow.com/questions/14313183/javascript-regex-how-do-i-check-if-the-string-is-ascii-only
// eslint-disable-next-line no-control-regex
const isASCII = (string) => /^[\x00-\x7F]*$/.test(string);
/**
 * Preprocess CSV data for the count of incidents per incident type,
 * incidents per state, incidents per city, incidents per year
 * @param {string} incident: one row of the csv file
 */
const reduceIncident = (incident, currentData) => {
  // const stateCounts = {}; // key-value pairs of state->incident count
  // const cityCounts = {}; // key-value pairs of city->incident count
  // const yearCounts = {}; // key-value pairs of year(19,20...)->incident count
  // const incidentCounts = {}; // key-value pairs of incident type(human trafficking, massage parlor...)-incident count
  const state = incident['Business State'].trim();
  const cityIndex = `${incident['Business City']},${state}`;
  const focus = incident['Content/Focus'];
  const ptSentence = incident['PT Sentence'];

  const d = dateParser.parse(incident['Date of Operation']);
  const year = String(d).substring(String(d).length - 4, String(d).length);

  // if state doesn't exist skip count
  if (
    state === '' ||
    state === ',' ||
    !isASCII(state) ||
    state === undefined ||
    state === null
  )
    return currentData;

  if (
    currentData.yearCounts[year] === undefined ||
    currentData.yearCounts[year] === null
  )
    currentData.yearCounts[year] = {
      stateCounts: {},
      cityCounts: {},
      incidentTypeCounts: {},
    };

  const yearCounts = currentData.yearCounts[year];

  if (
    yearCounts.stateCounts[state] === undefined ||
    yearCounts.stateCounts[state] === null
  )
    yearCounts.stateCounts[state] = 1;
  else yearCounts.stateCounts[state] = yearCounts.stateCounts[state] + 1;

  if (
    yearCounts.cityCounts[cityIndex] === undefined ||
    yearCounts.cityCounts[cityIndex] === null
  )
    yearCounts.cityCounts[cityIndex] = 1;
  else yearCounts.cityCounts[cityIndex] = yearCounts.cityCounts[cityIndex] + 1;

  if (
    yearCounts.incidentTypeCounts[focus] === undefined ||
    yearCounts.incidentTypeCounts[focus] === null
  )
    yearCounts.incidentTypeCounts[focus] = 1;
  else
    yearCounts.incidentTypeCounts[focus] =
      yearCounts.incidentTypeCounts[focus] + 1;

  // double count for PT Sentence
  if (ptSentence === 'Yes') {
    yearCounts.stateCounts[state]++;
    yearCounts.cityCounts[cityIndex]++;
    yearCounts.incidentTypeCounts[focus]++;
  }

  return currentData;
};

/**
 * Preprocess vacatur law data for relevant fields
 * @param law: one row of the csv file
 */

const preprocessVacaturLaw = async (law) => {
  // remove existing
  await VacaturLaw.findOneAndRemove({
    state: law['State'],
  });

  let newVacaturLaw = new VacaturLaw({
    state: law['State'],
    anyTypeCivilRemedy: law['Any Tye of Civil Remedy'] === 'Yes',
    offersVacatur: law['Offers Vacatur'] || 'No',
    offersClemency: law['Offers Clemency'] || 'No',
    offersExpungement: law['Offers Expungement'] || 'No',
    rank: law['Rank'],
  });

  newVacaturLaw.save();
};

/**
 * Preprocess criminal law data for relevant fields
 * @param law: one row of the csv file
 */

const preprocessCriminalLaw = async (law) => {
  const state = law['State/Territory'];

  if (state === '') return;

  // remove existing
  await CriminalLaw.findOneAndRemove({
    stateTerritory: state,
  });

  const dateOfOperationStrs = dateParser.parse(law['Date First Passed'] || '');
  let datePassed = new Date('1/1/2000').getTime();

  if (dateOfOperationStrs.length > 0) {
    datePassed = new Date(dateOfOperationStrs[0]).getTime();

    if (isNaN(datePassed)) datePassed = new Date('1/1/2000').getTime();
  }

  let newCriminalLaw = new CriminalLaw({
    stateTerritory: state,
    datePassed,
    summary: law['Summary'] || '',
  });

  newCriminalLaw.save();
};

/**
 * Preprocess massage law data for relevant fields
 * @param law: one row of the csv file
 */

const preprocessMassageLaw = async (law) => {
  let state = law['State'] || law['State '] || '';
  const city = law['City'] || '';

  if (state === '') return;
  if (city !== '') {
    state = stateAbbreviations[state];
  }

  // remove existing
  await MassageLaw.findOneAndRemove({
    city,
    state,
  });

  let newMassageLaw = new MassageLaw({
    city,
    state,
    strengthOfLaw:
      law['Strength of Current City Laws'] || law['Strength of State Laws'],
  });

  newMassageLaw.save();
};

const preprocessNewsMediaLaw = async (law) => {
  const state = law['State'] || '';

  if (state === '') return;

  const obj = {
    state: law['State'],
    city: law['City'],
    focus: law['Content/Focus'],
    lawAbout: law['What is this law about?'],
    status: law['Status'],
    notes: law['Notes'],
  };
  // remove existing
  await NewsMediaLaw.findOneAndRemove(obj);

  let newNewsMediaLaw = new NewsMediaLaw(obj);
  newNewsMediaLaw.save();
};

const applyActionToPreprocessedData = (to, from, action) => {
  // update absolute data
  const fromYearCounts = from.yearCounts;

  Object.entries(fromYearCounts).forEach(([year, counts]) => {
    let toYearData = to.yearCounts[year] || {
      incidentTypeCounts: {},
      stateCounts: {},
      cityCounts: {},
    };

    // update incident types
    const toIncidentTypeCounts = reduceActionToPreprocessedCounts(
      toYearData.incidentTypeCounts,
      counts.incidentTypeCounts,
      action
    );

    // update state counts
    const toStateCounts = reduceActionToPreprocessedCounts(
      toYearData.stateCounts,
      counts.stateCounts,
      action
    );

    // update city counts
    const toCityCounts = reduceActionToPreprocessedCounts(
      toYearData.cityCounts,
      counts.cityCounts,
      action
    );

    // save
    to.yearCounts[year] = {
      incidentTypeCounts: toIncidentTypeCounts,
      stateCounts: toStateCounts,
      cityCounts: toCityCounts,
    };
  });
};

const reduceActionToPreprocessedCounts = (toCounts, fromCounts, action) => {
  // update incident types
  return Object.entries(fromCounts).reduce((toCounts, [index, fromCount]) => {
    const currentCount = toCounts[index];
    const entryExistsInAbs =
      currentCount !== undefined &&
      currentCount !== null &&
      !isNaN(currentCount);

    if (action === PREPROCESSED_DATA_ACTIONS.Add) {
      if (entryExistsInAbs) {
        toCounts[index] += fromCount;
      } else {
        toCounts[index] = fromCount;
      }
    } else if (action === PREPROCESSED_DATA_ACTIONS.Sub && entryExistsInAbs) {
      toCounts[index] -= fromCount;
    }

    // clean up
    if (toCounts[index] <= 0) {
      delete toCounts[index];
    }

    return toCounts;
  }, toCounts);
};

const fetchAggregateData = async () => {
  const data = await PreprocessedIncidentData.findOne({
    fileName: AGGREGATE_INCIDENT_DATA_FILE_NAME,
  });

  return data.yearCounts;
};

const fetchAggregateDataInRange = async (startYear, endYear) => {
  const years = [];

  if (!isNaN(startYear) && !isNaN(endYear)) {
    const data = await fetchAggregateData();

    for (let i = startYear; i <= endYear; i++) {
      years.push(data[i]);
    }
  }

  return years;
};

module.exports = {
  reduceIncident,
  preprocessMassageLaw,
  preprocessVacaturLaw,
  preprocessCriminalLaw,
  preprocessNewsMediaLaw,
  applyActionToPreprocessedData,
  fetchAggregateData,
  fetchAggregateDataInRange,
  PREPROCESSED_DATA_ACTIONS,
  AGGREGATE_INCIDENT_DATA_FILE_NAME,
};
