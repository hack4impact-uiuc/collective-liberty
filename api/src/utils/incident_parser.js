/*
 * this script is used to parse the excel sheet
 * provided mock data for incidents of human trafficking
 */

var XLSX = require('xlsx')
var mongoose = require('mongoose')
var Incident = require('../models/Incident')

mongoose.connect(process.env.MONGO_URL)


const main = async () => {
  const workbook = XLSX.readFile('incident1.xlsx')
  const worksheet = workbook.Sheets[workbook.SheetNames[0]]

  const json = XLSX.utils.sheet_to_json(worksheet)
  
  for (const incident of json) {
    let newIncident = new Incident({
        focus: incident["Content/Focus"],
        caseTag: incident["Case Tag"],
        dateOfOperation: incident["Date of Operation"],
        endDateOfOperation: incident["Date of Operation"],
        operationType: incident["Operation Type"],
        city: incident["Business City"],
        state: incident["Business State"],
        notes: incident["Notes"]
        })

    newIncident.save()
    }

};

main();