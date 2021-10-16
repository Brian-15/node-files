
const argv = process.argv;
const fs = require('fs');
const axios = require('axios');

function cat(path) {
    try {
        const url = new URL(String(path));
        return webCat(path);
    } catch (_) {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading ${argv[2]}:`);
                console.error(err.message);
                process.exit(1);
            }
    
            console.log(data);
        });
    }
}

function webCat(URL) {
    axios.get(URL)
        .then(resp => console.log(resp))
        .catch(err => {
            console.error(`Error fetching ${argv[2]}:`);
            console.error(`  Error: ${err.message}`);
            process.exit(1);
        });
}

cat(argv[2]);