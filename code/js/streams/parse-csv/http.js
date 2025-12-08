const http = require('http');
const fs = require('fs')
const split = require('split2')

const { parseCSV, pickFirst5, toJSON } = require('./utils')

// All from above
const stream = fs.createReadStream('code/js/streams/parse-csv/sample.csv')
  .pipe(split())
  .pipe(parseCSV())
  .pipe(pickFirst5())
  .pipe(toJSON())

const server = http.createServer((req, res) => {
  stream.pipe(res);
});

server.listen(8000, () => {
  console.log('-------')
  console.log('Listening on http://localhost:8000')
});


// /Users/abbasq6v/Documents/ABC kids/_ Visa App/Ammi
