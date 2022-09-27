const fs = require('fs');
const { execSync }  = require('child_process');
const repo = require('../../configs/repo')

function initJson () {
    repo.global.username = execSync('git config user.name').toString().trim();
    fs.writeFile('./configs/repo.json', JSON.stringify(repo, null, 2), function(error) {
        if (error) {
            console.log(error);
        }
    })
}

function createRepoConfig (name, url) {
    repo.repository[name] = {
        "id": repo.global.nb_repository,
        "name": name,
        "url": url
    }
    repo.global.nb_repository += 1;
    fs.writeFile('./configs/repo.json',JSON.stringify(repo, null, 2), function(error) {
        if (error) {
            console.log(error);
        }
    })
}

module.exports = { initJson, createRepoConfig }