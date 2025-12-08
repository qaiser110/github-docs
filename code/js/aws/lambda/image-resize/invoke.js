#!/usr/bin/env node
const handler = require('./resizer.js');

// Usage: ./invoke.js http://example.org/image.jpg <size=32>
// ./invoke.js   http://pbs.twimg.com/profile_images/1117472492527001602/etxkjW5k_reasonably_small.png  100
const url = process.argv[2];
const size = process.argv[3]
  ? Number(process.argv[3])
  : undefined;
handler.downloadAndResize({ url, size }, {}, (error, data) => {
  if (error) return console.error('FAILURE', error.message);
  console.log('SUCCESS', data);
});
