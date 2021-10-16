
const argv = process.argv;
const fs = require('fs');
const axios = require('axios');

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

function webCat(url) {
    try {
        // execute if url is an actual URL
        new URL(String(url))
        axios.get(url)
            .then(resp => console.log(resp))
            .catch(err => {
                console.error(`Error fetching ${argv[2]}:`);
                console.error(`  Error: ${err.message}`);
                process.exit(1);
            });
    } catch (_) {
        // run cat()
        return cat(url)
    }
}

function catWrite(path, filename) {

    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${filename}`);
            console.error(err.message);
            process.exit(1);
        }

        fs.writeFile(path, data, (err, _) => {
            if (err) {
                console.error(`Couldn't write ${path}:`);
                console.error(err.message);
                process.exit(1);
            }
    
            console.log(`no output, but ${path} contains contents of ${filename}`);
        })
    });
}

function webCatWrite(path, url) {

    if (!path || !url) {
        console.error('Error: could not find required arguments for --out flag.');
        process.exit(1);
    }

    try {
        const hostname = new URL(url).hostname;

        axios.get(url)
            .then(resp => {
                fs.writeFile(path, resp.data, (err, _) => {
                    if (err) {
                        console.error(`Couldn't write ${path}:`);
                        console.error(err.message);
                        process.exit(1);
                    }
            
                    console.log(`no output, but ${path} contains ${hostname}'s HTML`);
                })
            })
            .catch(err => {
                console.error(`Error fetching ${url}:`);
                console.error(`  Error: ${err.message}`);
                process.exit(1);
            });
        
    } catch (_) {
        return catWrite(path, url);
    }
}

if (argv[2] == '--out') {
    webCatWrite(argv[3], argv[4]);
}
else {
    webCat(argv[2]);
}