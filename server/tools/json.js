const fs = require('fs');
const repo = require('../../configs/repo')

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

module.exports = { createRepoConfig }