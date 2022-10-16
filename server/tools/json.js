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

function createRepoConfig (name, url, start, finish, compilation, test, coding_style) {
    let json_repo = JSON.parse(openFile('repo.json'));
    let id = Object.keys(json_repo).length;
    (compilation == 'on') ? compilation = true : compilation = false;
    (test == 'on') ? test = true : test = false;
    (coding_style == 'on') ? coding_style = true : coding_style = false;
    json_repo['repo-' + id] = {
        "id": id,
        "name": name,
        "url": url,
        "last_test": "",
        "last_commit": "",
        "start": start,
        "finish": finish,
        "compilation": compilation,
        "test": test,
        "coding_style": coding_style
    };
    fs.writeFile('./configs/repo.json', JSON.stringify(json_repo, null, 2), function(error) {
        if (error) {
            console.log(error);
        }
    });
}

function deleteRepoConfig (name) {
    let json_repo = JSON.parse(openFile('repo.json'));
    let id = Object.keys(json_repo).length;
    for (let i = 0; i < id; i++) {
        if (json_repo['repo-' + i].name == name) {
            delete json_repo['repo-' + i];
            break;
        }
    }
    fs.writeFile('./configs/repo.json', JSON.stringify(json_repo, null, 2), function(error) {
        if (error) {
            console.log(error);
        }
    });
}

function openFile (url) {
    let rawdata = fs.readFileSync(`configs/${url}`);
    return rawdata;
}

module.exports = { initJson, createRepoConfig, deleteRepoConfig, openFile };