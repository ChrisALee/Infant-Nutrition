const generate = require('nanoid/generate');
const url = require('nanoid/url');
const fs = require('fs');

const stream = fs.createWriteStream('./guids');
stream.once('open', fd => {
    for (let i = 0; i < 30; i++) {
        stream.write(generate(url, 10) + '\n');
    }
    stream.end();
});
