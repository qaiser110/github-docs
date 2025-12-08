const { exec, spawn } = require('child_process')

const execute = (command, callback) =>
  new Promise((resolve, reject) => {
    return exec(command, (error, stdout, stderr) => {
      if (error || stderr)
        return callback ? callback(error || stderr) : reject(error || stderr)
      return callback ? callback(stdout) : resolve(stdout)
    })
  })

const getGitUser = async callback => {
  const name = await execute('git config --global user.name')
  const email = await execute('git config --global user.email')
  const info = {
    name: name.replace('\n', ''),
    email: email.replace('\n', ''),
  }
  return callback ? callback(info) : info
}

/*
module.exports.printGitUser = function() {
  getGitUser().then(console.log)
}

const getGitUser = callback =>
  new Promise((resolve, reject) => {
    execute('git config --global user.name', function(name) {
      execute('git config --global user.email', function(email) {
        const info = {
          name: name.replace('\n', ''),
          email: email.replace('\n', ''),
        }
        return callback ? callback(info) : resolve(info)
      })
    })
  })
*/

module.exports.printGitUser = function() {
  getGitUser().then(console.log)
}
