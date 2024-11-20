const https = require('https');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const port = 3000;
const cheerio = require('cheerio');
let base = 'main_d.css';
let main_arr;

app.use((req, res, next) => {
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
app.use(
    fs.readdir(path.join(__dirname, 'content'),(err, files) => {
        let zag;
        if(err){
            throw err;
        }
        main_arr = [`<li class="out main_content">Главная страница</li>`];
        files.forEach((elem) =>{
            fs.readFile(path.join(__dirname, 'content', elem ), 'utf8', (err, elem) => {
                if(err) {
                    console.error("Ошибка при чтении файла:", err);
                    return;
                }
                const $ = cheerio.load(elem);
                zag = $("h1").text();
            });
            main_arr.push(`<li class="out">${zag}</li>`);
        })
        main_arr.push(`<li class="out relacs">Релакс</li>`);
    })
);

app.get("/", (req, res) => {    
    if(req.body.menu === "menu"){
        res.send(main_arr);
    }
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