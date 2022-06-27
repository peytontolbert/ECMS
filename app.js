var createError = require('http-errors');
const mysql = require("mysql");
var express = require('express');
var path = require('path');
var bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
const http = require("http");



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var server = http.createServer(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/system1', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/system1.html'));
});

app.get('/login', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/login.html'));
});

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/register', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/registration.html'));
});

app.use('/index', indexRouter);
app.use('/users', usersRouter);


server.listen(process.env.PORT || 443); 

