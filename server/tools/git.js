const { spawn } = require('child_process');
const fs = require('fs');

function checkIfRepositoryExists (name) {
    return fs.existsSync(`./repositories/${name}`);
};

function formatUrl(url) {
    if (!url.startsWith('https://')) {
        let urlArray = url.split(':');
        url = 'https://github.com/' + urlArray[1];
    }
    return url;
}

function updateRepo (name) {
    let promise = new Promise((resolve, reject) => {
        const git = spawn('git', ['pull'], { cwd: `./repositories/${name}` });
        git.on('close', (code) => {
            resolve(code);
        });
    });
    return promise;
}

module.exports = { checkIfRepositoryExists, formatUrl, updateRepo };