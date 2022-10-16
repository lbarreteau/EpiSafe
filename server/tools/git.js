const { execSync}  = require('child_process');
const fs = require('fs');

function cloneRepository (name, url) {
    execSync(`git clone ${url} ./repositories/${name}`);
};

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

module.exports = { cloneRepository, checkIfRepositoryExists, formatUrl };