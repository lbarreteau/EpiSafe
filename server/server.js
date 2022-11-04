const express = require('express');
const app = express();
const display = require('./tools/display');
const repo = require('./repo');
const globalConfig = require('../configs/global');
const json = require('./tools/json');
const git = require('./tools/git');
let bodyParser = require("body-parser");
const compile = require('./compilation');
const others = require('./tools/others');
const compilation_chart = require('./compilationCharts');

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    if (globalConfig.first_use) {
        res.redirect('/getting-started');
    } else {
        res.redirect('/view-repository/0');
    }
});

app.get('/getting-started', (req, res) => {
    res.render('getting-started.ejs', { empSalary: empSalary });
})


// View repository

app.get('/view-repository-by-id/:id', (req, res) => {
    let repo = Object.entries(json.openRepoFile());
    res.render('view-repository-id.ejs', { id: req.params.id, dataCompilationChart_1: compilation_chart.getChart1(repo, req.params.id) });
})

app.get('/view-repository/:id', (req, res) => {
    let repo = Object.entries(json.openRepoFile());
    // get the number of compilation and test
    let nb_check = 0;
    for (let i = 0; i < repo.length; i++) {
        for (let j = 0; j < repo[i][1].compilation_log.length; j++) {
            nb_check++;
        }
        for (let j = 0; j < repo[i][1].test_log.length; j++) {
            nb_check++;
        }
    }
    res.render('view-repository.ejs', { repo: repo, id: req.params.id, nb_check: nb_check });
})


// Add new repository

app.get('/add-repository', (req, res) => {
    res.render('add-repository.ejs');
})

app.post('/add-repository', (req, res) => {
    let promise = new Promise((resolve, reject) => {
        repo.addRepo(req.body.name, req.body.url, req.body.start, req.body.finish, req.body.compilation, req.body.test, req.body.coding_style);
        resolve();
    });
    promise.then(() => {
        setTimeout(() => { res.redirect('/view-repository/0'); }, 1000);
    })
    promise.catch((error) => {
        console.log(error);
    });
});

app.get('/delete-repository', (req, res) => {
    let data = json.openFile('repo.json');
    let repo = Object.entries(JSON.parse(data));
    res.render('delete-repository.ejs', { repo: repo });
});

app.post('/delete-repository', (req, res) => {
    repo.deleteRepo(req.body.repository);
    res.redirect('view-repository/0');
});

function startServer() {
    app.listen(globalConfig.port, globalConfig.ip, () => {
        display.displayListening(globalConfig.ip, globalConfig.port);
        engine();
    });
}

function engine() {
    setInterval(() => {
        let data = json.openFile('repo.json');
        let repo = Object.entries(JSON.parse(data));
        let date = others.getDate();
        for (let i = 0; i < repo.length; i++) {
            if (repo[i][1].compilation_date == `${date['hour']}:${date['minute']}` && repo[i][1].compilation) {
                let promise = new Promise((resolve, reject) => {
                    git.updateRepo(repo[i][1].name);
                    resolve();
                });
                promise.then(() => {
                    compile.project(repo[i][1].id, repo[i][1].name, date);
                })
                promise.catch((error) => {
                    console.log(error);
                })
            }
            if (repo[i][1].test_date == `${date['hour']}:${date['minute']}` && repo[i][1].test) {
                git.updateRepo(repo[i][1].name);
                compile.test(repo[i][1].id, repo[i][1].name, date);
            }
        }
    }, 60000);
}

module.exports = { startServer };