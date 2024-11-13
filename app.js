const https = require('https');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const port = 3000;
let base = 'main_d.css';

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/css', express.static(path.join(__dirname, 'css')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
    switch (req.body.os) {
        case "pc":
            base = 'main_d.css';
            break;
        case "mobile":
            base = 'main_m.css';
            break;
    }
    res.send(`/css/desctop/${base}`); 
});

const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'), 
};

https.createServer(options, app).listen(port, function () {
    console.log(`Сервер запущен на порту ${port}`);
});