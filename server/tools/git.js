const { execSync}  = require('child_process');
const fs = require('fs');

function cloneRepository (name, url) {
    execSync(`git clone ${url} ./repositories/${name}`);
};

function checkIfRepositoryExists (name) {
    return fs.existsSync(`./repositories/${name}`);
};

module.exports = { cloneRepository, checkIfRepositoryExists };