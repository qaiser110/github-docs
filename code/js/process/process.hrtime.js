// https://blog.insiderattack.net/timers-immediates-and-process-nexttick-nodejs-event-loop-part-2-2c53fd511bb3
const start = process.hrtime();

setTimeout(() => {
  const end = process.hrtime(start);
  console.log(`timeout callback executed after ${end[0]}s and ${end[1]/Math.pow(10,9)}ms`);
}, 1000);


setTimeout(function() {
  console.log('setTimeout')
}, 0);
setImmediate(function() {
  console.log('setImmediate')
});
