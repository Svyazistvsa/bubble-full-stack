const https = require('https');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const port = 3000;
let base = 'main_d.css';

app.use((req, res, next) => {
    //const allowedOrigins = [
    //    "https://bubble.svyazist.cloudpub.ru:443",
    //    "https://localhost:3000" // Добавьте локальный хост
    //];
    //const origin = req.headers.origin;
    //if (allowedOrigins.includes(origin)) {
    //    res.header("Access-Control-Allow-Origin", origin);
    //}
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.options('*',(req,res) =>{
    res.sendStatus(200);
});

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/css', express.static(path.join(__dirname, 'css')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'scout.html'));
});

app.post('/', (req, res) => {

    switch (req.body.os) {
        case "pc":
            base = '/desctop/index.html';
            break;
        case "mobile":
            base = '/mobile/index.html';
            break;
    }
    res.sendFile(path.join(__dirname, 'css', base));
});

const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'), 
};

https.createServer(options, app).listen(port, function () {
    console.log(`Сервер запущен на порту ${port}`);
});