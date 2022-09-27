const git = require('./tools/git');
const json = require('./tools/json');

function addNewRepo (name, url) {
    if (git.checkIfRepositoryExists(name) == true) {
        return;
    }
    git.cloneRepository(name, url);
    json.createRepoConfig(name, url);
}

module.exports = { addNewRepo };