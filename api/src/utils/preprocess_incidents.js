/** Preprocess CSV data for 
** 1) the count of incidents for each incident type
** 2) the count of incidents per state
** 3) the count of incidents per year
**/

var csv = require('fast-csv');
const dateParser = require('./date_parser');

var stateCounts = {}; // key-value pairs of state->incident count
var yearCounts = {}; // key-value pairs of year(19,20...)->incident count
var incidentCounts = {}; // key-value pairs of incident type(human trafficking, massage parlor...)-incident count

csv.parseFile("./api/src/utils/prostitution_arrests_incidents.csv", {headers: true})
.on("data", incident => {
  if(incident["Business State"] == '')
  {
    if(stateCounts["Unknown State"] == null)
      stateCounts["Unknown State"] = 1
    else
      stateCounts["Unknown State"] = stateCounts["Unknown State"]  + 1
  }
  else if(stateCounts[incident["Business State"]] == null)
    stateCounts[incident["Business State"]] = 1;
  else
    stateCounts[incident["Business State"]] = stateCounts[incident["Business State"]] + 1;
  
  date = dateParser.parse(incident["Publication Date"]);
  date = String(date).substring(String(date).length - 2, String(date).length)
  if(yearCounts[date] == null)
    yearCounts[date] = 1;
  else
    yearCounts[date] = yearCounts[date] + 1;
  
  if(incidentCounts["Prostitution"] == null)
    incidentCounts["Prostitution"] = 1;
  else
    incidentCounts["Prostitution"] = incidentCounts["Prostitution"] + 1;

});

csv.parseFile("./api/src/utils/massage_parlor_incidents.csv", {headers: true})
.on("data", incident => {
  if(incident["Business State"] == '')
  {
    if(stateCounts["Unknown State"] == null)
      stateCounts["Unknown State"] = 1
    else
      stateCounts["Unknown State"] = stateCounts["Unknown State"]  + 1
  }
  else if(stateCounts[incident["Business State"]] == null)
    stateCounts[incident["Business State"]] = 1;
  else
    stateCounts[incident["Business State"]] = stateCounts[incident["Business State"]] + 1;

  date = dateParser.parse(incident["Publication Date"]);
  date = String(date).substring(String(date).length - 2, String(date).length)
  if(yearCounts[date] == null)
    yearCounts[date] = 1;
  else
    yearCounts[date] = yearCounts[date] + 1;
  
  if(incidentCounts["Massage Parlor"] == null)
    incidentCounts["Massage Parlor"] = 1;
  else
    incidentCounts["Massage Parlor"] = incidentCounts["Massage Parlor"] + 1;
}); 

csv.parseFile("./api/src/utils/human_trafficking_incidents.csv", {headers: true})
.on("data", incident => {
  if(stateCounts[incident["Business State"]] == null)
    stateCounts[incident["Business State"]] = 1;
  else
    stateCounts[incident["Business State"]] = stateCounts[incident["Business State"]] + 1;

    date = dateParser.parse(incident["Publication Date"]);
    date = String(date).substring(String(date).length - 2, String(date).length)
  if(yearCounts[date] == null)
    yearCounts[date] = 1;
  else
    yearCounts[date] = yearCounts[date] + 1;

  if(incidentCounts["Human Trafficking"] == null)
    incidentCounts["Human Trafficking"] = 1;
  else
    incidentCounts["Human Trafficking"] = incidentCounts["Human Trafficking"] + 1;
})
.on("end", () => {
  console.log(stateCounts ,"\n", yearCounts ,"\n", incidentCounts);
});



