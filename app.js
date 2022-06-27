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

var con = mysql.createConnection({
  host: "72.218.151.51",
  user: "root",
  password: "123",
  database: "pinboards",
})

con.connect(function(err) {
  if (err) throw err;
  console.log("connected to mysql");
  con.query("CREATE DATABASE IF NOT EXISTS pinboards", function (err, result) {
      if (err) throw err;
      console.log("database pinboards connected");
  });
});



var employees = "CREATE TABLE IF NOT EXISTS employees (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, username varchar(255) NOT NULL, password varchar(255) NOT NULL)";
con.query(employees, function (err, result) {
    if (err) throw err;
    console.log("users table connected");
})

var system1 = "CREATE TABLE IF NOT EXISTS system1 (valve varchar(255) NOT NULL PRIMARY KEY, status varchar(255) NOT NULL, username varchar(255) NOT NULL)";
con.query(system1, function (err, result) {
    if (err) throw err;
    console.log("system1 table connected");
})

app.get('/system1historydata', function(req, res) {
    let sql = "SELECT * FROM system1history"
    console.log("get system1history");
    con.query (sql, (error, results) => {
        if (error) throw error;
        console.log(results);
        res.send(results);
    })
})


server.listen(process.env.PORT || 443); 

