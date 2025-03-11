const https = require('https');
const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const fsSync = require('fs');
const cheerio = require('cheerio');
const Emitter = require('events');
const app = express();
const port = 3000;
class MyEmitter extends Emitter {}
const myEmitter = new MyEmitter();
let base = 'main_d.css',
    main_arr = [`<li class="out main_content">Главная страница</li>`],
    main_cont = [];
// Чтение контента директории
async function readContentDirectory() {
    try {
        const dirPath = path.join(__dirname, 'content');
        await fs.access(dirPath);
        const files = await fs.readdir(dirPath);
        for (const elem of files) {
            const filePath = path.join(dirPath, elem);
            const stats = await fs.stat(filePath);
            if (stats.isDirectory()) continue;
            
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const $ = cheerio.load(fileContent);
            const zag = $("h1").text();
            const img = $("img.main").attr("src");
            main_arr.push(`<li class="out" data-name="${elem}">${zag}</li>`);
            main_cont.push(
                `<div class="tile" data-name="${elem}" style="background: url('${img}') center center no-repeat black; background-size: cover;"><span class="zag">${zag}</span></div>`
            );
        }
        main_arr.push(`<li class="out relax ">Релакс</li>`);
    } catch (error) {
        console.error(`Ошибка: ${error.message}`);
    }
}
readContentDirectory();
// CORS middleware
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
// Статические файлы с правильными MIME типами
app.use(express.static(__dirname, {
    setHeaders: (res, path) => {
        if (path.endsWith('.html')) {
            res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        }
    }
}));
app.use('/scripts', express.static(path.join(__dirname, 'scripts'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
        }
    }
}));
app.use('/css', express.static(path.join(__dirname, 'css'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css; charset=UTF-8');
        }
    }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Маршруты
app.get("/", (req, res) => {
    if (req.query.menu) {
        res.json(main_arr);
    } else if(req.query.main) {
        res.json(main_cont);
    } else {
        res.sendFile(path.join(__dirname, 'scout.html'));
    }
});
app.get("/favicon.ico", (req, res) => {
    res.status(204).end();
});
myEmitter.on("getLink", (url, res) => {
    res.sendFile(path.join(__dirname, "scout.html"));
});
app.get("/content/:filename", (req, res) => {
    res.sendFile(path.join(__dirname, 'scout.html'));
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
app.post('/content', (req, res) => {
    res.sendFile(path.join(__dirname, 'content', req.body.name));
});
// HTTPS сервер
const options = {
    key: fsSync.readFileSync('server.key'),
    cert: fsSync.readFileSync('server.cert')
};
https.createServer(options, app).listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});