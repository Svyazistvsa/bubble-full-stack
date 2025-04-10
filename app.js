const https = require('https');
const express = require('express');
const useragent = require('express-useragent');
const path = require('path');
const fs = require('fs').promises;
const fsSync = require('fs');
const cheerio = require('cheerio');
const app = express();
const port = 3000;

let base = 'main_d.css',
    main_arr = [`<li class="out main_content"><span class="mm">Главная страница</span></li>`],
    main_cont = [] ;


async function readContentDirectory() {
    try {
        const dirPath = path.join(__dirname, 'content');
        await fs.access(dirPath); 
        const files = await fs.readdir(dirPath);
        for (const elem of files) {
            const filePath = path.join(dirPath, elem);
            const stats = await fs.stat(filePath);
            if (stats.isDirectory()) {
                continue;
            }
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const $ = cheerio.load(fileContent);
            const zag = $("h1").text();
            const img = $("img.main").attr("src");
            main_arr.push(`<li class="out" data-name="${elem}"><span class="mm">${zag}</span></li>`);
            main_cont.push(
                `<div class="tile" data-name="${elem}" style="background: url('${img}') center center no-repeat black; background-size: cover;"><span class="zag">${zag}</span></div>`
            );
        }
        main_arr.push(`<li class="out relax "><span class="mm">Релакс</span></li>`);
    } catch (error) {
        console.error(`Ошибка: ${error.message}`);
    }
}

readContentDirectory();

let choiceHtml = (req) =>{
    if (req.useragent.isMobile||req.useragent.isTablet||req.useragent.isMac){
        base = 'mobile/index.html';
    } else {
        base = 'desctop/index.html';
    }    
}

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
//app.use((req, res, next) => {
//    if (req.hostname === '5.188.35.23'){
//        res.redirect(301, `https://bubble.bl${req.originalUrl}`);
//    } else {
//        next();
//    }
//})
app.use(express.static(__dirname));
app.use('/scripts', express.static(path.join(__dirname, 'scripts'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
        }
    }
}));
app.use(useragent.express());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/css', express.static(path.join(__dirname, 'css')));

app.get("/relax", (req, res) => {
    choiceHtml(req);
    res.sendFile(path.join(__dirname, 'css', base));
})

app.get("/content/:filename", (req, res) => {    
    if(req.params.filename){
        choiceHtml(req);
        res.sendFile(path.join(__dirname, 'css', base));
    }
})

app.get("/", (req, res) => {    
    if (req.query.menu) {
        res.setHeader('Content-Type', 'application/json');
        res.json(main_arr);
    } else if(req.query.main) {
        res.setHeader('Content-Type', 'application/json');
        res.json(main_cont);
    } else {
        choiceHtml(req);
        res.sendFile(path.join(__dirname, 'css', base));
        console.log(req.hostname);
    }
});

app.get("/favicon.ico", (req, res) => {
    const iconPath = path.join(__dirname, 'icons8-bubbles-100.ico');
    fs.readFile(iconPath, (err, data) => {
        if(err) {
            res.status(404).end();
            return;
        }
        res.setHeader('Content-Type', 'image/x-icon');
        res.send(data);
    })
});

app.post('/content', (req, res) =>{
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, 'content', req.body.name));
});

const options = {
    key: fsSync.readFileSync('server.key'), 
    cert: fsSync.readFileSync('server.cert'),
};

https.createServer(options, app).listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

