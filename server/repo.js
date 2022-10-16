const git = require('./tools/git');
const json = require('./tools/json');

function addNewRepo (name, url, start, finish, compilation, test, coding_style) {
    if (git.checkIfRepositoryExists(name) == true) {
        return;
    }
    git.cloneRepository(name, url);
    console.log('Repository cloned');
    json.createRepoConfig(name, url, start, finish, compilation, test, coding_style);
}

function deleteRepo (name) {
    json.deleteRepoConfig(name);
    json.updateRepoNumber();
}

module.exports = { addNewRepo, deleteRepo };