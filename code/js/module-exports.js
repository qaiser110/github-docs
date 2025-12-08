/* Proxy module exports for testing */
// https://github.com/thlorenz/proxyquire

// https://stackoverflow.com/questions/13151693/passing-arguments-to-require-when-loading-module
module.exports = function(app, db) {
  var module = {}

  module.auth = function(req, res) {
    // This will be available 'outside'.
    // Authy stuff that can be used outside...
  }

  // Other stuff...
  module.pickle = function(cucumber, herbs, vinegar) {
    // This will be available 'outside'.
    // Pickling stuff...
  }

  function jarThemPickles(pickle, jar) {
    // This will be NOT available 'outside'.
    // Pickling stuff...

    return pickleJar
  }

  return module
}

// es6
class MyClass {
  constructor(arg1, arg2, arg3) {}
  myFunction1() {}
  myFunction2() {}
  myFunction3() {}
}

module.exports = (arg1, arg2, arg3) => {
  return new MyClass(arg1, arg2, arg3)
}

// And then you get your expected behaviour.
var MyClass = require('/MyClass.js')(arg1, arg2, arg3)
