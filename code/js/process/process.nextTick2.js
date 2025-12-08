/*
https://blog.insiderattack.net/timers-immediates-and-process-nexttick-nodejs-event-loop-part-2-2c53fd511bb3

You can see the output is an infinite loop of "nextTick" callback calls, and the setTimeout, setImmediate and fs.readFile callbacks were never called because nextTick takes priority.
started
process.nextTick call 1
process.nextTick call 2
...
process.nextTick call 9
process.nextTick call 10
process.nextTick call 11
....
*/

setImmediate(() => console.log('this is set immediate 1'));
setImmediate(() => console.log('this is set immediate 2'));
setImmediate(() => console.log('this is set immediate 3'));

setTimeout(() => console.log('this is set timeout 1'), 0);
setTimeout(() => {
  console.log('this is set timeout 2');
  process.nextTick(() => console.log('this is process.nextTick added inside setTimeout'));
}, 0);
setTimeout(() => console.log('this is set timeout 3'), 0);
setTimeout(() => console.log('this is set timeout 4'), 0);
setTimeout(() => console.log('this is set timeout 5'), 0);

process.nextTick(() => console.log('this is process.nextTick 1'));
process.nextTick(() => {
  process.nextTick(console.log.bind(console, 'this is the inner next tick inside next tick'));
});
process.nextTick(() => console.log('this is process.nextTick 2'));
process.nextTick(() => console.log('this is process.nextTick 3'));
process.nextTick(() => console.log('this is process.nextTick 4'));

/*
this is process.nextTick 1
this is process.nextTick 2
this is process.nextTick 3
this is process.nextTick 4
this is the inner next tick inside next tick
this is set timeout 1
this is set timeout 2
this is set timeout 3
this is set timeout 4
this is set timeout 5
this is process.nextTick added inside setTimeout
this is set immediate 1
this is set immediate 2
this is set immediate 3
*/
