const https = require('https');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const port = 3000;

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, 'index.html'));
});

const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
}

https.createServer(options, app).listen(port, function (req, res){
    console.log(`port ${port}`)
})