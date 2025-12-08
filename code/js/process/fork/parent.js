const { fork } = require('child_process');
const path = require('path');

const forked = fork(path.join(__dirname, 'child.js'))

forked.on('message', (msg) => {
    console.log('Message from child', msg);
});

forked.send({ hello: 'world' });
