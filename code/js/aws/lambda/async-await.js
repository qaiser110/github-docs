const sum = (a, b) => new Promise((resolve, reject) => {
  setTimeout(() => resolve(a + b), 2000)
})

const sum2 = (a, b) => a + b

exports.handler = async (event, context, cb) => {
  const sum2c = await sum(3,3);
  const sum3c = 4 + 3;
  // return sum2c
  return cb(null, sum2c);
};
