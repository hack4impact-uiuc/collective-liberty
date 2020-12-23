const dateParser = require('./date_parser');
const mongoose = require('mongoose');
const CriminalLaw = require('../models/criminalLaw');
const VacaturLaw = require('../models/vacaturLaw');
const MassageLaw = require('../models/massageLaw');
/**
 * Preprocess CSV data for the count of incidents per incident type,
 * incidents per state, incidents per city, incidents per year
 * @param {string} incident: one row of the csv file
 */
const preprocessIncidents = (incident) => {
  var stateCounts = {}; // key-value pairs of state->incident count
  var cityCounts = {}; // key-value pairs of city->incident count
  var yearCounts = {}; // key-value pairs of year(19,20...)->incident count
  var incidentCounts = {}; // key-value pairs of incident type(human trafficking, massage parlor...)-incident count

  if (stateCounts[incident['Business State']] == null)
    stateCounts[incident['Business State']] = 1;
  else
    stateCounts[incident['Business State']] =
      stateCounts[incident['Business State']] + 1;

  if (cityCounts[incident['Business City']] == null)
    cityCounts[incident['Business City']] = 1;
  else
    cityCounts[incident['Business City']] =
      cityCounts[incident['Business City']] + 1;

  const d = dateParser.parse(incident['Publication Date']);
  const date = String(d).substring(String(d).length - 2, String(d).length);

  if (yearCounts[date] == null) yearCounts[date] = 1;
  else yearCounts[date] = yearCounts[date] + 1;

  if (incidentCounts[incident['Content/Focus']] == null)
    incidentCounts[incident['Content/Focus']] = 1;
  else
    incidentCounts[incident['Content/Focus']] =
      incidentCounts[incident['Content/Focus']] + 1;

  return stateCounts, cityCounts, yearCounts, incidentCounts;
};

/**
 * Preprocess vacatur law data for relevant fields
 * @param law: one row of the csv file
 */

const preprocessVacaturLaw = (law) => {
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

const processCriminalLaw = (law) => {
  const dateOfOperationStrs = dateParser.parse(
    law['Date First Passed']?.toString()
  );
  let datePassed = new Date('1/1/2000').getTime();

  if (dateOfOperationStrs.length > 0) {
    datePassed = new Date(dateOfOperationStrs[0]).getTime();
  }

  let newCriminalLaw = new CriminalLaw({
    stateTerritory: law['State/Territory'],
    datePassed,
    summary: law['Summary'] || '',
  });

  newCriminalLaw.save();
};

/**
 * Preprocess massage law data for relevant fields
 * @param law: one row of the csv file
 */

const preprocessMassageLaw = (law) => {
  let newMassageLaw = new MassageLaw({
    city: law['City'] || '',
    state: law['State'] || law['State '],
    strengthOfLaw:
      law['Strength of Current City Laws'] || law['Strength of State Laws'],
  });

  newMassageLaw.save();
};

module.exports = {
  preprocessIncidents,
  preprocessMassageLaw,
  preprocessVacaturLaw,
  processCriminalLaw,
};
