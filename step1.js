

const argv = process.argv;
const fs = require('fs');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${argv[2]}:`);
            console.error(err.message);
            process.exit(1);
        }

        console.log(data);
    });
}

cat(argv[2]);