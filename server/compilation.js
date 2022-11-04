const { spawn } = require('child_process');
const json = require('./tools/json');
const fs = require('fs');
const others = require('./tools/others');

function project (id, name, date) {
    const compile = spawn('make', ['re'], { cwd: `./repositories/${name}` });
    compile.on('close', (code) => {
        let json_repo = json.openRepoFile();
        json_repo['repo-' + id].last_compilation = `${date['day']}-${date['month']}-${date['year']} ${date['hour']}:${date['minute']}:${date['second']}`;
        json_repo['repo-' + id].compilation_log.push({
            "date": `${date['year']}-${date['month']}-${date['day']} ${date['hour']}:${date['minute']}:${date['second']}`,
            "status": (code ? 0 : 1)
        });
        fs.writeFile('./configs/repo.json', JSON.stringify(json_repo, null, 2), function(error) {
            if (error) {
                console.log(error);
            }
        });
    });
}

function test (id, name, date) {
    const test = spawn('make', ['tests_run'], { cwd: `./repositories/${name}` });
    test.on('close', (code) => {
        let json_repo = json.openRepoFile();
        json_repo['repo-' + id].last_test = `${date['day']}-${date['month']}-${date['year']} ${date['hour']}:${date['minute']}:${date['second']}`;;
        json_repo['repo-' + id].test_log.push({
            "date": `${date['year']}-${date['month']}-${date['day']} ${date['hour']}:${date['minute']}:${date['second']}`,
            "status": (code ? 0 : 1)
        });
        fs.writeFile('./configs/repo.json', JSON.stringify(json_repo, null, 2), function(error) {
            if (error) {
                console.log(error);
            }
        });
    });
}

module.exports = { project, test };