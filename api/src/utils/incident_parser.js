/*
 * this script is used to parse the provided
 * mock data for incidents of human trafficking
 */

var XLSX = require('xlsx')
const path = require('path');
var mongoose = require('mongoose')
var Incident = require('../models/Incident')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017', { useNewUrlParser: true, useUnifiedTopology: true })


function main() {
  const workbook = XLSX.readFile(path.join(__dirname, './incidents.xlsx'))
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

main()