const express = require('express');
const app = express();
const display = require('./tools/display');
const repo = require('./repo');
const globalConfig = require('../configs/global');
const gitlog = require("gitlog").default;
const json = require('./tools/json');
let bodyParser = require("body-parser");

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    console.log(globalConfig.first_use)
    if (globalConfig.first_use) {
        res.redirect('/getting-started');
    } else {
        res.redirect('/view-repository');
    }
});

app.get('/getting-started', (req, res) => {
    res.render('getting-started.ejs', { empSalary: empSalary });
})


// View repository

app.get('/view-repository-by-id/:id', (req, res) => {
    res.render('view-repository-id.ejs', { id: req.params.id });
})
app.get('/view-repository', (req, res) => {
    let data = json.openFile('repo.json');
    let repo = Object.entries(JSON.parse(data));
    res.render('view-repository.ejs', { repo: repo });
})


// Add new repository

app.get('/add-repository', (req, res) => {
    res.render('add-repository.ejs');
})

app.post('/add-repository', (req, res) => {
    repo.addNewRepo(req.body.name, req.body.url, req.body.start, req.body.finish, req.body.compilation, req.body.test, req.body.coding_style);
    res.redirect('view-repository');
});


// Delete repository

app.get('/delete-repository', (req, res) => {
    let data = json.openFile('repo.json');
    let repo = Object.entries(JSON.parse(data));
    res.render('delete-repository.ejs', { repo: repo });
});

app.post('/delete-repository', (req, res) => {
    repo.deleteRepo(req.body.repository);
    res.redirect('view-repository');
});


function startServer() {
    app.listen(globalConfig.port, globalConfig.ip, () => {
        display.displayListening(globalConfig.ip, globalConfig.port);
    });
}

module.exports = { startServer };