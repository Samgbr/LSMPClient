var http = require('http');
var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname + '/public')));

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

const PORT=8090;

app.get('/inv', function(req, res){
    res.render('inv');
});

//Get home page
app.get('/home' ,function(req,res) {
	res.render('home');
});

app.get('/register' ,function(req,res) {
	res.render('register');
});

app.get('/error' ,function(req,res) {
	res.render('error');
});

app.get('/pregister' ,function(req,res) {
	res.render('pregister');
});

app.get('/phome' ,function(req,res) {
	res.render('phome');
});

app.get('/reviews' ,function(req,res) {
	res.render('reviews');
});

app.get('/' ,function(req,res) {
	res.render('welcome');
});

app.listen(PORT);

