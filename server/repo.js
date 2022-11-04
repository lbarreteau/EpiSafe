const git = require('./tools/git');
const json = require('./tools/json');
const { execSync }  = require('child_process');
const compile = require('./compilation');
const others = require('./tools/others');

function addRepo (name, url, start, finish, compilation, test, coding_style) {
    let promise = new Promise((resolve, reject) => {
        execSync(`git clone ${url} ./repositories/${name}`);
        resolve();
    });
    promise.then(() => {
        let json_repo = json.openRepoFile();
        let id = Object.keys(json_repo).length;
        json.createRepoConfig(json_repo, id, name, url, start, finish, compilation, test, coding_style);
        if (compilation) {
            compile.project(id, name, others.getDate());
        }
        if (test) {
            compile.test(id, name, others.getDate());
        }
    });
    promise.catch((error) => {
        console.log(error);
    });
}

function deleteRepo (name) {
    json.deleteRepoConfig(name);
    execSync(`rm -rf ./repositories/${name}`);
}

module.exports = { addRepo, deleteRepo };