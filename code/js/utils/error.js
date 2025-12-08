const RESET = '\x1b[0m'

const f = {
  fmt: {
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m',
  },
  c: {
    // colors
    red: '\x1b[31m',
    cyan: '\x1b[36m',
    black: '\x1b[30m',
    green: '\x1b[32m',
    yellow: '\x1b[33',
  },
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    gray: '\x1b[100m',
  },
}

const format = (msg, clr, bg) =>
  `${clr ? f.c[clr] : ''}${bg ? f.bg[bg] : ''}${msg}${RESET}`

module.exports._format = format

module.exports._error = (message) => {
  // console.log(`${FgRed}${BgYellow}${message}${RESET}`)
  console.log(format(message, 'red', 'yellow'))
  throw new Error(message)
}

module.exports._message = (message) => {
  console.log(format(`\n${message}\n`, 'cyan'))
}

// const bright = "\x1b[1m"
// const dim = "\x1b[2m"
// const underscore = "\x1b[4m"
// const blink = "\x1b[5m"
// const reverse = "\x1b[7m"
// const hidden = "\x1b[8m"

// const red = '\x1b[31m'
// const cyan = '\x1b[36m'
// const black = "\x1b[30m"
// const green = "\x1b[32m"
// const yellow = "\x1b[33m"
// const blue = "\x1b[34m"
// const magenta = "\x1b[35m"
// const white = "\x1b[37m"
// const gray = "\x1b[90m"

// const bgBlack = "\x1b[40m"
// const bgRed = "\x1b[41m"
// const bgGreen = "\x1b[42m"
// const bgYellow = '\x1b[43m'
// const bgBlue = "\x1b[44m"
// const bgMagenta = "\x1b[45m"
// const bgCyan = "\x1b[46m"
// const bgWhite = "\x1b[47m"
// const bgGray = "\x1b[100m"
