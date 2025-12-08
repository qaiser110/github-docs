const { spawn } = require('child_process')

/*
const child = spawn('pwd')
child.stdout.on('data', (data) => {
    console.log(`child stdout:\nPWD:  ${data}`)
})
*/

/*
// The result of this combination is that we get a standard input mode where we can type something, and when we hit Ctrl+D, what we typed will be used as the input of the wc command.

const wordCount = spawn('wc')
process.stdin.pipe(wordCount.stdin)
wordCount.stdout.on('data', (data) => {
    console.log(`No of words:\n${data}`)
})
*/

// get list of files in current directory
const fileList = spawn('find', ['.', '-type', 'f'])
fileList.stdout.on('data', (data) => {
    console.log(`File List:\n${data}`)
})

/* find to list all files in directory, 'wc -l' to get the cound of lines(files) */
const findFiles = spawn('find', ['.', '-type', 'f'])
const countLines = spawn('wc', ['-l']) // count Lines

findFiles.stdout.pipe(countLines.stdin)

countLines.stdout.on('data', (data) => {
    console.log(`No of Files:\n${data}`)
})


countLines.on('exit', function (code, signal) {
    console.log('child process exited with ' +
      `code ${code} and signal ${signal}`)
})

countLines.stderr.on('data', (data) => {
    console.error(`child stderr:\n${data}`)
})
