var express = require('express');
var app = express();
let busboy = require('connect-busboy')
var fs = require('fs');


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
app.post('/', function (req, res) {
    req.pipe(req.busboy);
    req.busboy.on('file', function(fieldname, file, filename) {
        var fstream = fs.createWriteStream('./files/' + filename); 
        file.pipe(fstream);
        fstream.on('close', function () {
            res.send('upload succeeded!');
        });
    });
    // res.send('you uploaded file');
})


app.get('/welcome', function (req, res) {
    res.send('<b>Hello</b> welcome to my http server made with express');
});


app.listen(8080, function () {
    console.log('Example app listening on port 8080.');
});

// http.createServer((request, response) => {
//     console.log('received req');
//     request.on('error', (err) => {
//         console.error(err);
//         response.statusCode = 400;
//         response.end();
//     });
//     response.on('error', (err) => {
//         console.error(err);
//     });
//     //   if (request.method === 'POST' && request.url === '/echo') {
//     // request.pipe(response);
//     response.setHeader("Access-Control-Allow-Origin", "*");
//     response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
//         "Referer", "User-Agent");
//     if ('OPTIONS' == request.method) {
//         response.sendStatus(200);
//     } else {
//         next();
//     }
//     response.statusCode = 200;
//     response.end('ciao');
//     fileContent = 'something';
//     fileName = 'f.txt';
//     fs.writeFile(fileName, fileContent, function (err) {
//         if (err) throw err;
//         console.log('File is created successfully.');
//     });
//     console.log('resp', response);
// }).listen(8080);