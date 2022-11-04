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

function createRepoConfig (json_repo, id, name, url, start, finish, compilation, test, coding_style) {
    const gitlog = require("gitlog").default;
    (compilation == 'on') ? compilation = true : compilation = false;
    (test == 'on') ? test = true : test = false;
    (coding_style == 'on') ? coding_style = true : coding_style = false;
    let promise = new Promise((resolve, reject) => {
        const options = {
            repo: "./repositories/" + name,
            number: 1,
            fields: ["authorDate"],
            execOptions: { maxBuffer: 1000 * 1024 },
        };
        const commits = gitlog(options);
        resolve(commits[0].authorDate);
    });
    promise.then((last_commit) => {
        json_repo['repo-' + id] = {
            "id": id,
            "name": name,
            "url": url,
            "last_commit": `${last_commit.split(' ')[0]} ${last_commit.split(' ')[1]}`,
            "start": start.split('-').reverse().join('-'),
            "finish": finish.split('-').reverse().join('-'),
            "compilation": compilation,
            "compilation_date": "23:42",
            "last_compilation": "",
            "test": test,
            "test_date": "23:42",
            "last_test": "",
            "coding_style": coding_style,
            "test_log": [],
            "compilation_log": []
        }
        fs.writeFile('./configs/repo.json', JSON.stringify(json_repo, null, 2), function(error) {
            if (error) {
                console.log(error);
            }
        })
    });
    promise.catch((error) => {
        console.log(error);
    });
}

function deleteRepoConfig (name) {
    let json_repo = JSON.parse(openFile('repo.json'));
    let id = Object.keys(json_repo).length;
    for (let i = 0; i < id; i++) {
        if (json_repo['repo-' + i].name == name) {
            delete json_repo['repo-' + i];
            if (i != id - 1) {
                for (let j = i; j < id - 1; j++) {
                    json_repo['repo-' + j] = json_repo['repo-' + (j + 1)];
                    json_repo['repo-' + j].id = j;
                }
                delete json_repo['repo-' + (id - 1)];
            }
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

function openRepoFile () {
    let data = openFile('repo.json');
    return JSON.parse(data);
}

module.exports = { initJson, createRepoConfig, deleteRepoConfig, openFile, openRepoFile };