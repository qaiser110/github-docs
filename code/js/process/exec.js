const { exec, spawn } = require('child_process')

// find all files in curr directory and get the lines count
exec('find . -type f | wc -l', (err, stdout, stderr) => {
    if (err) {
        console.error(`exec error: ${err}`);
        return;
    }

    console.log(`Number of files ${stdout}`);
})

// configure "spawn" to use the "shell syntax"
const child = spawn('find . -type f | wc -l', {
    stdio: 'inherit',
    shell: true
})

// same as >> ANSWER=42; echo $ANSWER
spawn('echo $ANSWER', {
    stdio: 'inherit',
    shell: true,
    env: { ANSWER: 42 },
});

child.on('data', (data) => {
    //this won't work, no
    console.log(`>>> this won't print:\n${data}`)
})
