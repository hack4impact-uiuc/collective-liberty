const dateParser = require('./date_parser');
const mongoose = require('mongoose');
const CriminalLaw = require('../models/criminalLaw');
const VacaturLaw = require('../models/vacaturLaw');
const MassageLaw = require('../models/massageLaw');
const NewsMediaLaw = require('../models/newsMediaLaw');
const stateAbbreviations = require('../utils/stateAbbreviations');
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
  const state = incident['Business State'];
  const cityIndex = `${incident['Business City']},${state}`;
  const focus = incident['Content/Focus'];

  // if state doesn't exist skip count
  if (state.length === 0) return currentData;

  if (
    currentData.stateCounts[state] === undefined ||
    currentData.stateCounts[state] === null
  )
    currentData.stateCounts[state] = 1;
  else currentData.stateCounts[state] = currentData.stateCounts[state] + 1;

  if (
    currentData.cityCounts[cityIndex] === undefined ||
    currentData.cityCounts[cityIndex] === null
  )
    currentData.cityCounts[cityIndex] = 1;
  else
    currentData.cityCounts[cityIndex] = currentData.cityCounts[cityIndex] + 1;

  const d = dateParser.parse(incident['Publication Date']);
  const date = String(d).substring(String(d).length - 4, String(d).length);

  if (
    currentData.yearCounts[date] === undefined ||
    currentData.yearCounts[date] === null
  )
    currentData.yearCounts[date] = 1;
  else currentData.yearCounts[date] = currentData.yearCounts[date] + 1;

  if (
    currentData.incidentTypeCounts[focus] === undefined ||
    currentData.incidentTypeCounts[focus] === null
  )
    currentData.incidentTypeCounts[focus] = 1;
  else
    currentData.incidentTypeCounts[focus] =
      currentData.incidentTypeCounts[focus] + 1;

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

module.exports = {
  reduceIncident,
  preprocessMassageLaw,
  preprocessVacaturLaw,
  preprocessCriminalLaw,
  preprocessNewsMediaLaw,
};
