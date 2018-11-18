var http = require('http');
var fs = require('fs');
var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname + '/public')));

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

const PORT=8090; 

app.get('/', function(req, res){
    res.render('home');
});

app.listen(PORT);

