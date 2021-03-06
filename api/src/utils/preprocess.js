const dateParser = require('./date_parser');
const CriminalLaw = require('../models/criminalLaw');
const VacaturLaw = require('../models/vacaturLaw');
const MassageLaw = require('../models/massageLaw');
const NewsMediaLaw = require('../models/newsMediaLaw');
const DataFile = require('../models/DataFile');
const PreprocessedIncidentData = require('../models/preprocessedIncidentData');
const stateAbbreviations = require('../utils/stateAbbreviations');
const constants = require('../utils/constants');

// aggregated data of all current files uploaded.
const AGGREGATE_INCIDENT_DATA_FILE_ID = '_AGGREGATE_INCIDENTS_';
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
  const cityIndex = formatCityIndex(incident['Business City'], state);
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
  else yearCounts.stateCounts[state]++;

  if (
    yearCounts.cityCounts[cityIndex] === undefined ||
    yearCounts.cityCounts[cityIndex] === null
  )
    yearCounts.cityCounts[cityIndex] = 1;
  else yearCounts.cityCounts[cityIndex]++;

  if (
    yearCounts.incidentTypeCounts[focus] === undefined ||
    yearCounts.incidentTypeCounts[focus] === null
  )
    yearCounts.incidentTypeCounts[focus] = {};

  if (
    yearCounts.incidentTypeCounts[focus][state] === undefined ||
    yearCounts.incidentTypeCounts[focus][state] === null
  ) {
    yearCounts.incidentTypeCounts[focus][state] = 1;
  } else {
    yearCounts.incidentTypeCounts[focus][state]++;
  }

  if (
    yearCounts.incidentTypeCounts[focus][cityIndex] === undefined ||
    yearCounts.incidentTypeCounts[focus][cityIndex] === null
  ) {
    yearCounts.incidentTypeCounts[focus][cityIndex] = 1;
  } else {
    yearCounts.incidentTypeCounts[focus][cityIndex]++;
  }

  // double count for PT Sentence
  if (ptSentence === 'Yes') {
    yearCounts.stateCounts[state]++;

    if (yearCounts.cityCounts[cityIndex]) {
      yearCounts.cityCounts[cityIndex]++;
    }

    if (yearCounts.incidentTypeCounts[focus][state]) {
      yearCounts.incidentTypeCounts[focus][state]++;
    }

    if (yearCounts.incidentTypeCounts[focus][cityIndex]) {
      yearCounts.incidentTypeCounts[focus][cityIndex]++;
    }
  }

  return currentData;
};

/**
 * Preprocess vacatur law data for relevant fields
 * @param law: one row of the csv file
 */

const preprocessVacaturLaw = async (dataFileId, law) => {
  return new VacaturLaw({
    dataFileId,
    state: law['State'].trim(),
    anyTypeCivilRemedy: law['Any Tye of Civil Remedy'].trim() === 'Yes',
    offersVacatur: law['Offers Vacatur'] ? law['Offers Vacatur'].trim() : 'No',
    offersClemency: law['Offers Clemency']
      ? law['Offers Clemency'].trim()
      : 'No',
    offersExpungement: law['Offers Expungement']
      ? law['Offers Expungement'].trim()
      : 'No',
    rank: law['Rank'].trim(),
  });
};

/**
 * Preprocess criminal law data for relevant fields
 * @param law: one row of the csv file
 */

const preprocessCriminalLaw = async (dataFileId, law) => {
  const state = law['State/Territory'];

  if (state === '') return;

  const dateOfOperationStrs = dateParser.parse(law['Date First Passed'] || '');
  let datePassed = new Date('1/1/2000').getTime();

  if (dateOfOperationStrs.length > 0) {
    datePassed = new Date(dateOfOperationStrs[0]).getTime();

    if (isNaN(datePassed)) datePassed = new Date('1/1/2000').getTime();
  }

  return new CriminalLaw({
    dataFileId,
    stateTerritory: state.trim(),
    datePassed,
    summary: law['Summary'] ? law['Summary'].trim() : '',
  });
};

/**
 * Preprocess massage law data for relevant fields
 * @param law: one row of the csv file
 */

const preprocessMassageLaw = async (dataFileId, law) => {
  let state = law['State'] || law['State '] || '';
  const city = law['City'] || '';
  const strengthOfLaw =
    law['Strength of Current City Laws'] || law['Strength of State Laws'] || '';

  if (state === '') return;
  if (city !== '') {
    state = stateAbbreviations[state] || '';
  }

  return new MassageLaw({
    dataFileId,
    city: city.trim(),
    state: state.trim(),
    strengthOfLaw: strengthOfLaw.trim(),
  });
};

const preprocessNewsMediaLaw = async (dataFileId, law) => {
  const state = law['State'] || '';

  if (state === '') return;

  return new NewsMediaLaw({
    dataFileId,
    state,
    city: (law['City'] || '').trim(),
    focus: (law['Content/Focus'] || '').trim(),
    lawAbout: (law['What is this law about?'] || '').trim(),
    status: (law['Status'] || '').trim(),
    notes: (law['Notes'] || '').trim(),
  });
};

const applyActionToPreprocessedData = (to, from, action) => {
  // update absolute data
  const fromYearCounts = from.yearCounts;

  Object.entries(fromYearCounts).forEach(([year, fromYearlyCount]) => {
    let toYearData = to.yearCounts[year] || {
      incidentTypeCounts: {},
      stateCounts: {},
      cityCounts: {},
    };

    // save
    to.yearCounts[year] = applyActionToYearCount(
      toYearData,
      fromYearlyCount,
      action
    );
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
    dataFileId: AGGREGATE_INCIDENT_DATA_FILE_ID,
  });

  return data && data.yearCounts;
};

const fetchAggregateDataInRange = async (startYear, endYear) => {
  const years = [];

  if (!isNaN(startYear) && !isNaN(endYear)) {
    const data = await fetchAggregateData();

    if (data) {
      for (let i = startYear; i <= endYear; i++) {
        years.push(
          data[i] || {
            incidentTypeCounts: {},
            stateCounts: {},
            cityCounts: {},
          }
        );
      }
    }
  }

  return years;
};

const applyActionToYearCount = (to, from, action) => {
  // update incident types
  const incidentTypeCounts = reduceActionToPreprocessedCounts(
    to.incidentTypeCounts,
    from.incidentTypeCounts,
    action
  );

  // update state counts
  const stateCounts = reduceActionToPreprocessedCounts(
    to.stateCounts,
    from.stateCounts,
    action
  );

  // update city counts
  const cityCounts = reduceActionToPreprocessedCounts(
    to.cityCounts,
    from.cityCounts,
    action
  );

  return {
    incidentTypeCounts,
    stateCounts,
    cityCounts,
  };
};

const mergeYearlyCounts = (list) => {
  return list.reduce(
    (acc, yearlyCount) => {
      return applyActionToYearCount(
        acc,
        yearlyCount,
        PREPROCESSED_DATA_ACTIONS.Add
      );
    },
    {
      incidentTypeCounts: {},
      stateCounts: {},
      cityCounts: {},
    }
  );
};

const formatCityIndex = (city, state) => `${city},${state}`;

const refreshAbsoluteData = async () => {
  const dataFileId = AGGREGATE_INCIDENT_DATA_FILE_ID;
  await PreprocessedIncidentData.findOneAndRemove({
    dataFileId,
  });

  // construct new data
  let newAbsData = {
    dataFileId,
    yearCounts: {},
  };

  const allData = await PreprocessedIncidentData.find({});
  allData.forEach((data) => {
    if (data.dataFileId !== dataFileId) {
      applyActionToPreprocessedData(
        newAbsData,
        data,
        PREPROCESSED_DATA_ACTIONS.Add
      );
    }
  });

  // fill in all years
  for (let i = constants.ABS_START_YEAR; i <= constants.ABS_END_YEAR; i++) {
    if (!newAbsData.yearCounts[i]) {
      newAbsData.yearCounts[i] = {
        stateCounts: {},
        cityCounts: {},
        incidentTypeCounts: {},
      };
    }
  }

  const dbObj = new PreprocessedIncidentData(newAbsData);
  await dbObj.save();
};

const isValidIncidentRow = (row) =>
  row['Business State'] !== undefined &&
  row['Business City'] !== undefined &&
  row['Content/Focus'] !== undefined &&
  row['PT Sentence'] !== undefined &&
  row['Date of Operation'] !== undefined;

const isValidMassageLawRow = (row) =>
  (row['State'] !== undefined || row['State '] !== undefined) &&
  ((row['City'] !== undefined &&
    row['Strength of Current City Laws'] !== undefined) ||
    row['Strength of State Laws'] !== undefined);

const isValidVacaturLawRow = (row) =>
  row['State'] !== undefined &&
  (row['Any Tye of Civil Remedy'] !== undefined ||
    row['Any Type of Civil Remedy'] !== undefined) &&
  row['Offers Vacatur'] !== undefined &&
  row['Offers Clemency'] !== undefined &&
  row['Offers Expungement'] !== undefined &&
  row['Rank'] !== undefined;

const isValidCriminalLawRow = (row) =>
  row['State/Territory'] !== undefined &&
  row['Date First Passed'] !== undefined &&
  row['Summary'] !== undefined;

const isValidNewsMediaLawRow = (row) =>
  row['State'] !== undefined &&
  row['City'] !== undefined &&
  row['Content/Focus'] !== undefined &&
  row['What is this law about?'] !== undefined &&
  row['Status'] !== undefined &&
  row['Notes'] !== undefined;

module.exports = {
  reduceIncident,
  preprocessMassageLaw,
  preprocessVacaturLaw,
  preprocessCriminalLaw,
  preprocessNewsMediaLaw,
  applyActionToPreprocessedData,
  fetchAggregateData,
  fetchAggregateDataInRange,
  applyActionToYearCount,
  mergeYearlyCounts,
  formatCityIndex,
  refreshAbsoluteData,
  isValidIncidentRow,
  isValidMassageLawRow,
  isValidVacaturLawRow,
  isValidCriminalLawRow,
  isValidNewsMediaLawRow,
  PREPROCESSED_DATA_ACTIONS,
  AGGREGATE_INCIDENT_DATA_FILE_ID,
};
