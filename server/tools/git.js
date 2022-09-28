const { execSync}  = require('child_process');
const fs = require('fs');
const repo = require('../../configs/repo');

function cloneRepository (name, url) {
    const formatUrl = url.replace('https://', 'https://' + repo.global.username + ':' + repo.global.password + '@');
    execSync(`git clone ${formatUrl} ./repositories/${name}`);
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