const getRandomNumber = require('./getRandomNumber');

const getRandomnNumberPromise = () => new Promise((resolve, reject) => {
  setTimeout( () => {
    const randomNumber = getRandomNumber();
    resolve(`Here's your number: ${randomNumber}`);
  }, 1000);
})

exports.handler = async (event, context) => {
  const key1 = event.key1
  console.log(`key1: ${key1}`)
  if (!key1) throw new Error('key1 is required')
  if (key1 !== 222) throw new Error('Invalid Key')
  return await getRandomnNumberPromise()
};
