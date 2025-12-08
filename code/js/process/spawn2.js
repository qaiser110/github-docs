/* We are using spawn(), because later on, it lets us access
  stdin, stdout and stderr of the command while it is running*/
const { spawn } = require('child_process')

async function main() {
  const filePath = process.argv[2]
  console.log('INPUT: ' + filePath)

  const childProcess = spawn('cat', [filePath], {
    stdio: [process.stdin, process.stdout, process.stderr]
  })    // connecting the stdin/stdout/stderr of the child process
        // to the stdin/stdout/stderr of the current process

  await onExit(childProcess) // await until the process is completely finished

  console.log('### DONE')
}

function onExit(childProcess) {
  return new Promise((resolve, reject) => {
    childProcess.once('exit', (code, signal) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error('Exit with error code: ' + code))
      }
    })
    childProcess.once('error', err => {
      reject(err)
    })
  })
}

main()
