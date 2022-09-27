const express = require('express');
const app = express();
const display = require('./tools/display');
const serverConfig = require('../configs/server');


app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

function startServer() {
    app.listen(serverConfig.port, serverConfig.ip, () => {
        display.displayListening(serverConfig.ip, serverConfig.port);
    });
}

module.exports = { startServer };