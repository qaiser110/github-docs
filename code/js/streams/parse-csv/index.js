// https://community.risingstack.com/the-definitive-guide-to-object-streams-in-node-js#enoughdemosletsdosomethingreal

const fs = require('fs')
const { parseCSV, pickFirst5, toJSON } = require('./utils')

// Since you never know how the data from fs.createReadStream is pulled into your memory,
//    the split2 package makes sure that you can process data line by line
const split = require('split2')

const stream = fs.createReadStream('code/js/streams/parse-csv/sample.csv')

stream
  .pipe(split())
  .pipe(parseCSV())
  .pipe(pickFirst5())
  .pipe(toJSON())
  .pipe(process.stdout)
