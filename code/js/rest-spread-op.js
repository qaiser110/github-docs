let logs

function disableOutput () {
  if (process.env.FULL_OUTPUT) {
    return
  }
  const mockLog = (type) => (...message) => {
    console.log('----message---')
    console.log(message)
    logs[type].push(message.join(' '))
    console.log('----logs[type]---')
    console.log(message.join(' '))
  }
  logs = {
    log: [],
    warn: [],
    error: []
  }
  originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error
  }
  mockLog('log')('some str', 'another str')
  // console.log = mockLog('log')
  // console.warn = mockLog('warn')
  // console.error = mockLog('error')
}

disableOutput()

// console.log('some val')

// process.stdout(logs)
