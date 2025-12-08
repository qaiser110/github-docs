const through2 = require('through2')

/*
the first line is always the heading for our data. It will provide the keys for our JSON objects.
*/
const parseCSV = () => {
  let templateKeys = []
  let parseHeadline = true
  return through2.obj((data, enc, cb) => {
    if (parseHeadline) {
      templateKeys = data.toString().split(',')
      parseHeadline = false
      return cb(null, null)
    }

    const entries = data.toString().split(',')
    const obj = {}

    templateKeys.forEach((el, index) => {
      obj[el] = entries[index]
    })

    return cb(null, obj)
  })
}

const pickFirst5 = () => {
  let cnt = 0
  return through2.obj((data, enc, cb) => {
    if (cnt++ < 5) {
      return cb(null, data)
    }
    return cb(null, null)
  })
}

// through2([ options, ] [ transformFunction ] [, flushFunction ])
const toJSON = () => {
  let objs = []
  return through2.obj(
    function(data, enc, cb) {
      objs.push(data)
      cb(null, null)
    },
    function(cb) {
      this.push(JSON.stringify(objs))   // (T1)
      cb()
    }
  )
}

/*
T1. A minimal implementation should call the callback function to indicate that the transformation is done, even if that transformation means discarding the chunk.

T2. To queue a new chunk, call this.push(chunk)—this can be called as many times as required before the callback() if you have multiple pieces to send on.

T3. Alternatively, you may use callback(err, chunk) as shorthand for emitting a single chunk or an error.
*/

const anExample = () => {
  fs.createReadStream('/tmp/important.dat')
    .pipe(
      through2({ objectMode: true, allowHalfOpen: false }, (chunk, enc, callback) => {
        callback(null, 'wut?') // note we can use the second argument on the callback
                        // to provide data as an alternative to this.push('wut?')
      })
    )
    .pipe(fs.createWriteStream('/tmp/wut.txt'))
}

/*
flushFunction is provided as the last argument (2nd or 3rd, depending on whether you've supplied options)
is called just prior to the stream ending. Can be used to finish up any processing that may be in progress.
*/
fs.createReadStream('/tmp/important.dat')
  .pipe(through2(
    (chunk, enc, cb) => cb(null, chunk), // transform is a noop
    function (cb) { // flush function
      this.push('tacking on an extra buffer to the end');
      cb();
    }
  ))
  .pipe(fs.createWriteStream('/tmp/wut.txt'));

module.exports = {
  parseCSV,
  pickFirst5,
  toJSON,
}
