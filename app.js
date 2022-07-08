var createError = require('http-errors');
const mysql = require("mysql2");
var express = require('express');
var path = require('path');
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
  user: "root2",
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
});


//LOGIN (AUTHENTICATE USER)
app.post("/login", async (req, res)=> {
    const username = req.body.username
    const password = req.body.password
    const sqlSearch = "Select * from employees where username = ?"
    const search_query = mysql.format(sqlSearch,[username])

     await con.query (search_query, async (err, result) => {
      
      if (err) throw (err)
      if (result.length == 0) {
       console.log("--------> User does not exist")
       res.sendStatus(404)
      } 
      else {
         const hashedPassword = result[0].password
         //get the hashedPassword from result
        if (await bcrypt.compare(password, hashedPassword)) {
        console.log("---------> Login Successful")
	    res.redirect('/systemselection');
        } 
        else {
        console.log("---------> Password Incorrect")
        res.send("Password incorrect!")
        } //end of bcrypt.compare()
      }//end of User exists i.e. results.length==0
     }) //end of connection.query()
    }) //end of app.post()


    app.post("/savesystem1", async (req,res) => {
        console.log(req.body);
        const username = req.body.username;
        const status = req.body.status;
        const valve = req.body.valve;
        const sqlSearch = "SELECT * FROM system1 WHERE valve = ?"
        const search_query = mysql.format(sqlSearch,[valve])
        const sqlInsert = "INSERT INTO system1 VALUES (?,?,?)"
        const insert_query = mysql.format(sqlInsert,[valve, status, username])
        const sqlUpdate = "UPDATE `system1` SET `status` = ?, `username` = ? WHERE `valve`= ?"
        const update_query = mysql.format(sqlUpdate,[status, username, valve])
        await con.query (search_query, async (err, result) => {
            if (err) throw (err)
            console.log("search results")
            console.log(result.length)
            if (result.length == 0) {
                console.log("valve not found: " + valve)
                console.log("creating new line")
                await con.query (insert_query, (err, result) => {
                    if (err) throw (err)
                    console.log ("Created new valve " + valve)
                    console.log(result.insertId)
                    res.redirect("/system1")
                })
            } else {
                console.log("initiating update")
                await con.query (update_query, (err, result, row, fields) => {
                    if (err) throw (err)
                    console.log ("Updating valve " + valve)
                    console.log(result)
                    console.log(row)
                    res.redirect("/system1")
                })
            }
        })   // end of con.query
    }); // end of app.post

    app.post("/savevalve", async (req,res) => {
        console.log(req.body);
        const valve = req.body.valve;
        const status = req.body.status;
        const sqlSearch = "SELECT * FROM system1 WHERE valve = ?"
        const search_query = mysql.format(sqlSearch,[valve])
        const sqlInsert = "INSERT INTO system1 VALUES (?,?)"
        const sqlInsertHistory =  "INSERT INTO system1history (valve, status) VALUES (?,?)"
        const insert_query = mysql.format(sqlInsert,[valve, status])
        const insertHistory_query = mysql.format(sqlInsertHistory,[valve, status])
        const sqlUpdate = "UPDATE `system1` SET `status` = ? WHERE `valve`= ?"
        const update_query = mysql.format(sqlUpdate,[status, valve])
        await con.query (search_query, async (err, result) => {
            if (err) throw (err)
            console.log("search results")
            console.log(result.length)
            if (result.length == 0) {
                console.log("valve not found: " + valve)
                console.log("creating new line")
                await con.query (insert_query, (err, result) => {
                    if (err) throw (err)
                    console.log ("Created new valve " + valve)
                    console.log(result.insertId)
                })
                await con.query (insertHistory_query, (err, result) => {
                    if (err) throw (err)
                    console.log("Adding history")
                })
                res.redirect("/system1")
            } else {
                console.log("initiating update")
                await con.query (update_query, (err, result, row, fields) => {
                    if (err) throw (err)
                    console.log ("Updating valve " + valve)
                    console.log(result)
                    console.log(row)
                })
                await con.query (insertHistory_query, (err, result) => {
                    if (err) throw (err)
                    console.log("Adding history")
                })
                res.redirect("/system1")
            }
        })   // end of con.query
    }); // end of app.post
        
    app.post("/removewaf", async (req,res) => {
        console.log(req.body);
        const valve = req.body.valve;
        const waf = req.body.waf;
        const sqlSearch = "SELECT * FROM system1wafs WHERE valve = ?"
        const search_query = mysql.format(sqlSearch,[valve])
        const sqlDelete = "DELETE FROM system1wafs WHERE valve = ? AND waf = ?"
        const delete_query = mysql.format(sqlDelete,[valve, waf])
        await con.query (sqlSearch, async (err, result) => {
            if (err) throw (err)
            console.log("search results")
            console.log(result.length)
            if (result.length == 0) {
                console.log("valve and waf not found " + valve + waf)
                res.send("valve+waf does not exist");
            } else {
                console.log("initiating update")
                await con.query (delete_query, (err, result, row, fields) => {
                    if (err) throw (err)
                    console.log ("deleting waf " + waf + " on valve " + valve)
                    console.log(result)
                }) 
                res.redirect("/system1")
            }
        })   // end of con.query
    }); // end of app.post
        
app.post("/register", async (req,res) => {
    const username = req.body.username;
    const hashedPassword = await bcrypt.hash(req.body.password,10);
     const sqlSearch = "SELECT * FROM employees WHERE username = ?"
     const search_query = mysql.format(sqlSearch,[username])
     const sqlInsert = "INSERT INTO employees VALUES (0,?,?)"
     const insert_query = mysql.format(sqlInsert,[username, hashedPassword])
     // ? will be replaced by values
     // ?? will be replaced by string
     await con.query (search_query, async (err, result) => {
      if (err) throw (err)
      console.log("------> Search Results")
      console.log(result.length)
      if (result.length != 0) {
       console.log("------> User already exists: " + username)
       res.sendStatus(409) 
      } 
      else {
       await con.query (insert_query, (err, result)=> {
       if (err) throw (err)
       console.log ("--------> Created new User: " + username)
       console.log(result.insertId)
       res.sendStatus(201)
      })
     }
    }) //end of con.query()
    }) //end of app.post()




app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

server.listen(process.env.PORT || 443); 

