// https://community.risingstack.com/the-definitive-guide-to-object-streams-in-node-js
// https://www.npmjs.com/package/through2
const through2 = require('through2');

/*
through2 function passes data (in a Buffer), some encoding information and a callback we can call once we're done with our transformation.

Usually, in Node streams, we pass Buffers with the data from the stream. For process.stdin this is likely
the current line before we press Return. Coming from a file, this can be actually anything.

Here, we transform the current Buffer to a string, create the uppercase version, and convert it back to a Buffer again.
The callback's first arg is a possible error. The stream will crash and the program will stop if you are
not listening to an "end" event to catch the error. The second parameter is the transformed data.
*/
const toUpperCase = through2((data, encoding, callback) => {
  callback(null, Buffer.from(data.toString().toUpperCase()));
});

const dashBetweenWords = through2((chunk, encoding, cb) => {
  cb(null, new Buffer(chunk.toString().split(' ').join('-')));
});

// The transformed data is piped to our writeable.
process.stdin
  .pipe(toUpperCase)
  .pipe(dashBetweenWords)
  .pipe(process.stdout);

