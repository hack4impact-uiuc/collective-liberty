const csv = require('fast-csv');
const dateParser = require('./date_parser');

/**
 * Preprocess CSV data for the count of incidents per incident type, 
 * incidents per state, incidents per city, incidents per year
 * @param {string} incident: one row of the csv file
 */
const preprocessCSV = (incident) => {

  var stateCounts = {}; // key-value pairs of state->incident count
  var cityCounts = {}; // key-value pairs of city->incident count
  var yearCounts = {}; // key-value pairs of year(19,20...)->incident count
  var incidentCounts = {}; // key-value pairs of incident type(human trafficking, massage parlor...)-incident count

  if(stateCounts[incident["Business State"]] == null)
    stateCounts[incident["Business State"]] = 1;
  else
    stateCounts[incident["Business State"]] = stateCounts[incident["Business State"]] + 1;

  if(cityCounts[incident["Business City"]] == null)
    cityCounts[incident["Business City"]] = 1;
  else
    cityCounts[incident["Business City"]] = cityCounts[incident["Business City"]] + 1;

  date = dateParser.parse(incident["Publication Date"]);
  date = String(date).substring(String(date).length - 2, String(date).length)
  
  if(yearCounts[date] == null)
    yearCounts[date] = 1;
  else
    yearCounts[date] = yearCounts[date] + 1;

  if(incidentCounts[incident["Content/Focus"]] == null)
    incidentCounts[incident["Content/Focus"]] = 1;
  else
    incidentCounts[incident["Content/Focus"]] = incidentCounts[incident["Content/Focus"]] + 1;

  return stateCounts, cityCounts, yearCounts, incidentCounts;
};

module.exports = {
  preprocessCSV
};
