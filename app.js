const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs').promises;
const fsSync = require('fs');
const cheerio = require('cheerio');
const app = express();
const port = 3000;

let base = 'main_d.css';
let main_arr = [`<li class="out main_content">Главная страница</li>`];


async function readContentDirectory() {
    try {
        const dirPath = path.join(__dirname, 'content');
        await fs.access(dirPath); 
        const files = await fs.readdir(dirPath);
        console.log('Содержимое директории:', files); 
        for (const elem of files) {
            const filePath = path.join(dirPath, elem);
            const stats = await fs.stat(filePath);
            if (stats.isDirectory()) {
                console.log(`${elem} - это директория`);
                continue;
            }
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const $ = cheerio.load(fileContent);
            const zag = $("h1").text();
            main_arr.push(`<li class="out" data-name="${elem}">${zag}</li>`);
        }
        main_arr.push(`<li class="out relax ">Релакс</li>`);
    } catch (error) {
        console.error(`Ошибка: ${error.message}`);
    }
}

readContentDirectory();


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.options('*', (req, res) => {
    res.sendStatus(200);
});

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/css', express.static(path.join(__dirname, 'css')));

app.get("/", (req, res) => {
    if (req.query.menu) {
        res.json(main_arr);
    } else {
        res.sendFile(path.join(__dirname, 'scout.html'));
    }
});

app.post('/', (req, res) => {
    switch (req.body.os) {
        case "pc":
            base = 'desctop/index.html';
            break;
        case "mobile":
            base = 'mobile/index.html';
            break;
    }
    res.sendFile(path.join(__dirname, 'css', base));
});

const options = {
    key: fsSync.readFileSync('server.key'), 
    cert: fsSync.readFileSync('server.cert'),
};

https.createServer(options, app).listen(port, function () {
    console.log(`Сервер запущен на порту ${port}`);
});