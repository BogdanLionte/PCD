var express = require('express');
var app = express();
let busboy = require('connect-busboy')
var fs = require('fs');
const path = require('path');


app.all('*', function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Host, Connection, Accept, access-control-allow-origin, origin, referer, accept");
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.get('/', function (req, res) {
    res.send('<b>My</b> first express http server');
});

app.use(busboy());
app.use(express.json());

app.post('/', function (req, res) {
    let fileName = './models/' + req.body.id + '.json';
    fs.writeFile(fileName, JSON.stringify(req.body), 'utf8', () => {});
    res.send('you uploaded file');
});

app.get('/models', function (req, res)  {
    let models = [];
    const directoryPath = path.join(__dirname, 'models');
    fs.readdir(directoryPath, function (err, files) {
        files.forEach(file => {
            let content = fs.readFileSync('./models/' + file, {encoding: 'utf-8'});
            models.push(JSON.parse(content));
        });
        res.send(JSON.stringify(models));
    });
});


app.get('/welcome', function (req, res) {
    res.send('<b>Hello</b> welcome to my http server made with express');
});


app.listen(8081, function () {
    console.log('Example app listening on port 8081.');
});
