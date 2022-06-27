var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require("http");



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var server = http.createServer(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
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

app.use('/index', indexRouter);
app.use('/users', usersRouter);


server.listen(process.env.PORT || 443); 

