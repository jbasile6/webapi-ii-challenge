const express = require('express');

const server = express();

server.use(express.json());


server.get('/', (req, res) => {
    res.send(`<h2>WEB API CHALLENGE II</h2>`)
});





module.exports = server;