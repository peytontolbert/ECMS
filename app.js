const mysql = require("mysql");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var session = require('express-session');
var logger = require('morgan');
const http = require("http");
const multer = require('multer');

var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];


var app = express();
var uploadstorage = multer.diskStorage({ 
                            destination: './uploads/',
                            filename: function(req, file, callback) { 
                                callback(null, file.originalname)
                            } 
                            });


var upload = multer({ storage: uploadstorage })

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

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/login', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/login.html'));
});

app.get('/about', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/about.html'));
});

app.get('/newdiagram', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/newdiagram.html'));
});

app.get('/systemlookup', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/systemlookup.html'));
});

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/register', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/registration.html'));
});


app.get('/systems', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/systems.html'));
});

app.get('/systemlist', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/systemlist.html'));
});

app.get('/dbmanagement', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/dbmanagement.html'));
});

var con = mysql.createConnection({
  multipleStatements: true,
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
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


var systemhistory = "CREATE TABLE IF NOT EXISTS systemhistory (valve varchar(255) NOT NULL PRIMARY KEY, status varchar(255) NOT NULL, username varchar(255) NOT NULL)";
con.query(systemhistory, function (err, result) {
    if (err) throw err;
    console.log("systemhistory table connected");
})

var systems = "CREATE TABLE IF NOT EXISTS systems (id int NOT NULL PRIMARY KEY, system varchar(255) NOT NULL)";
con.query(systems, function (err, result) {
    if (err) throw err;
    console.log("systems table connected");
})

var wafs = "CREATE TABLE IF NOT EXISTS wafs (id int NOT NULL PRIMARY KEY, waf varchar(255) NOT NULL, valve varchar(255) NOT NULL)";
con.query(wafs, function (err, result) {
    if (err) throw err;
    console.log("wafs table connected");
})


var valves = "CREATE TABLE IF NOT EXISTS valves (id int NOT NULL PRIMARY KEY, system varchar(255) NOT NULL, valve varchar(255) NOT NULL, coords varchar(255))";
con.query(valves, function (err, result) {
    if (err) throw err;
    console.log("valves table connected");
})

var pipes = "CREATE TABLE IF NOT EXISTS pipes (id int NOT NULL PRIMARY KEY, system varchar(255) NOT NULL, name varchar(255) NOT NULL, edges varchar(255) NOT NULL, status varchar(255), coords varchar(255), shape varchar(255) NOT NULL)";
con.query(pipes, function (err, result) {
    if (err) throw err;
    console.log("pipes table connected");
})

var components = "CREATE TABLE IF NOT EXISTS components (id int NOT NULL PRIMARY KEY, system varchar(255) NOT NULL, name varchar(255) NOT NULL, edges varchar(255), status varchar(255), coords varchar(255), shape varchar(255) NOT NULL)";
con.query(components, function (err, result) {
    if (err) throw err;
    console.log("components table connected");
})

var newvalves = "CREATE TABLE IF NOT EXISTS newvalves (id int NOT NULL PRIMARY KEY, system varchar(255) NOT NULL, valve varchar(255) NOT NULL, coords varchar(255))";
con.query(newvalves, function (err, result) {
    if (err) throw err;
    console.log("new valves table connected");
})

app.get('/systemhistorydata', function(req, res) {
    let sql = "SELECT * FROM systemhistory"
    console.log("get systemhistory");
    con.query (sql, (error, results) => {
        if (error) throw error;
        console.log(results);
        res.send(results);
    })
});

app.get('/systemlistsearch', function(req, res) {
    let sql = "SELECT * FROM systems"
    console.log("system search");
    con.query (sql, (error, results) => {
        if (error) throw error;
        console.log(results);
        res.send(results);
    })
})


app.get('/dbdata', function(req, res) {
    let sql = "SELECT * FROM dbdata"
    con.query(sql, (error, results) => {
        if (error) throw error;
        console.log(results)
        res.send(results);
    })
})

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
      } else {
         const hashedPassword = result[0].password
         //get the hashedPassword from result
        if (await bcrypt.compare(password, hashedPassword)) {
        console.log("---------> Login Successful")
	    res.redirect('/systemselection');
        } else {
        console.log("---------> Password Incorrect")
        res.send("Password incorrect!")
        } //end of bcrypt.compare()
      }//end of User exists i.e. results.length==0
     }) //end of connection.query()
    }) //end of app.post()

    
    app.post("/submitnewvalve", async (req,res) => {
        console.log(req.body);
        const system = req.body.system;
        const coords = req.body.coords;
        const valve = req.body.valve;
        const sqlSearch = "SELECT * FROM systems WHERE system = ?"
        const search_query = mysql.format(sqlSearch,[system])
        const sqlInsert = "INSERT INTO valves (system, valve, coords) VALUES (?,?,?)"
        const insert_query = mysql.format(sqlInsert,[system, valve, coords])
        await con.query (search_query, async (err, result) => {
            if (err) throw (err)
                await con.query (insert_query, (err, result) => {
                    if (err) throw (err)
                    console.log ("Created new valve " + valve)
                    console.log(result.insertId)
                    res.send("valve added")
                })
        })   // end of con.query
    }); // end of app.post

    
app.post('/systemwafs', async (req, res) => {
    const valve = req.body.valve
    const sqlSearch = "SELECT * FROM wafs where valve = ?"
    const search_query = mysql.format(sqlSearch,[valve])

    await con.query(search_query, async (error, results) => {
        if (error) throw error;
        if (results.length == 0) {
            console.log("valve has no wafs");
            console.log(results);
            res.send(results);
        } else {
        console.log(results)
        res.send(results);
        }
    })
})

app.post('/systemlookup', async (req, res) => {
    const system = req.body.system;
    console.log(req.body.system)
    const sqlSearch = "SELECT * FROM valves where system = ?"
    const search_query = mysql.format(sqlSearch,[system])

    await con.query(search_query, async (error, results) => {
        if (error) throw error;
        if (results.length == 0) {
            console.log("system not found");
            console.log(results);
            res.send(results);
        } else {
        console.log(results)
        res.send(results);
        }
    })
})

app.post('/valvelookup', async (req, res) => {
    const valve = req.body.valve;
    const sqlSearch = "SELECT * FROM wafs where valve = ?; SELECT * FROM permits where valve = ?"
    const search_query = mysql.format(sqlSearch,[valve, valve])
    await con.query(search_query, async (error, results) => {
        if (error) throw error;
        if (results.length == 0) {
            console.log("valve not found");
            console.log(results);
            res.send(results);
        } else {
        console.log(results)
        res.send({"wafs": results[0], "permits": results[1]});
        }
    })
})

app.post('/systemload', async (req, res) => {
    const system = req.body.system;
    const valvess = "";
    const pipess = "";
    console.log(req.body.system);
    const sqlSearch = "SELECT * FROM valves where system = ?; SELECT * FROM pipes where system = ?; SELECT * FROM components where system = ?"
    const sqlpipeSearch = "SELECT * FROM pipes where system = ?"
    const sqlcompSearch = "SELECT * FROM components where system = ?"
    const search_query = mysql.format(sqlSearch,[system, system, system])
    console.log(sqlSearch)
    await con.query(search_query, async (error, results, fields) => {
        if (error) throw error;
        if (results.length == 0) {
            console.log("system not found");
            console.log(results);
            res.send(results);
        } else {
        console.log(results)
        res.send({"valves": results[0], "pipes": results[1], "components": results[2]});
        }
    })
})

app.post("/submitnewdiagram", upload.single('diagram'), async function (req,res) {
    console.log(req.file)
    const system = req.file.originalname.replace('.png', '');
    console.log(system)
    
    const sqlSearch = "SELECT * FROM systems where system = ?"
    const search_query = mysql.format(sqlSearch,[system])
    const sqlInsert = "INSERT INTO systems (system) VALUES (?)"
    const insert_query = mysql.format(sqlInsert,[system])
    await con.query (search_query, async (err, result) => {
        if (err) throw (err)
        console.log("search results")
        console.log(result.length)
        if (result.length == 0) {
            console.log("system not found: " + system)
            console.log("creating new system")
            await con.query (insert_query, (err, result) => {
                if (err) throw (err)
                console.log ("Created new system " + system)
                console.log(result.insertId)
                res.send("system added")
            })
        } else {
            console.log("system exists")
            res.send("system exists")
        }
    })   // end of con.query
}); // end of app.post



app.post("/savevalve", async (req,res) => {
    console.log(req.body);
    const valve = req.body.valve;
    const status = req.body.status;
    console.log(valve)
    const sqlSearch = "SELECT * FROM valves WHERE valve = ?"
    const search_query = mysql.format(sqlSearch,[valve])
    const sqlInsert = "INSERT INTO valves VALUES (?,?)"
    const sqlInsertHistory =  "INSERT INTO systemhistory (valve, status, action) VALUES (?,?,?)"
    const insert_query = mysql.format(sqlInsert,[valve, status])
    const insertHistory_query = mysql.format(sqlInsertHistory,[valve, status, "changed status"])
    const sqlUpdate = "UPDATE `valves` SET `status` = ? WHERE `valve`= ?"
    const update_query = mysql.format(sqlUpdate,[status, valve])
    await con.query (search_query, async (err, result) => {
        if (err) throw (err)
        console.log("search results")
        console.log(result.length)
        if (result.length == 0) {
            console.log("valve not found: " + valve)
            res.redirect("/systemlist")
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
            res.redirect("/systemlist")
        }
    })   // end of con.query
}); // end of app.post

app.post("/addwaf", async(req,res) => {
    console.log(req.body);
    const waf = req.body.waf;
    const valve = req.body.valve;
    const sqlSearch = "SELECT * FROM wafs WHERE waf = ? AND valve = ?"
    const permitsqlSearch = " SELECT * FROM permits WHERE valve = ?"
    const search_query = mysql.format(sqlSearch,[waf, valve])
    const permitsearch_query = mysql.format(permitsqlSearch,[valve])
    const sqlInsert =  "INSERT INTO wafs (waf, valve) VALUES (?,?)"
    const sqlInsertHistory =  "INSERT INTO systemhistory (valve, waf, action) VALUES (?,?,?)"
    const insertHistory_query = mysql.format(sqlInsertHistory,[valve, waf, "added waf"])
    const insert_query = mysql.format(sqlInsert,[waf, valve])
    await con.query (search_query, async (err, result) => {
        if (err) throw (err)
        console.log("------> Search Results")
        console.log(result.length)
        if (result.length != 0) {
            console.log("------> waf already exists: " + valve)
            res.send("waf exists") 
        } 
        else { 
            await con.query(permitsearch_query, async(err,result) => {
                if (err) throw (err)
                if(result.length!=0) {
                    console.log("permit exists for valve: " + valve)
                } else {
                    await con.query(insert_query, (err, result) => {
                        if (err) throw err;
                        console.log(result)
                    })
                    await con.query(insertHistory_query, (err, result) => {
                        if (err) throw err;
                        console.log(result)
                    })
                    res.send("permit added");
                }
            })
        }
    })
})

app.post("/addwork", async(req,res) => {
    console.log(req.body);
    const permit = req.body.permit;
    const valve = req.body.valve;
    const sqlSearch = "SELECT * FROM permits WHERE permit = ? AND valve = ?"
    const wafSearch = "SELECT * FROM wafs WHERE valve = ?"
    const search_query = mysql.format(sqlSearch,[permit, valve])
    const wafsearch_query = mysql.format(wafSearch,[valve])
    const sqlInsert =  "INSERT INTO permits (permit, valve) VALUES (?,?)"
    const sqlInsertHistory =  "INSERT INTO systemhistory (valve, permit, action) VALUES (?,?,?)"
    const insertHistory_query = mysql.format(sqlInsertHistory,[valve, permit, "added permit"])
    const insert_query = mysql.format(sqlInsert,[permit, valve])
    await con.query (search_query, async (err, result) => {
        if (err) throw (err)
        console.log("------> Search Results")
        console.log(result.length)
        if (result.length != 0) {
            console.log("------> permit already exists: " + valve)
            res.send("permit exists") 
        } 
        else { 
            await con.query(wafsearch_query, async(err,result) => {
                if (err) throw (err)
                if(result.length!=0) {
                    console.log("waf exists for valve: " + valve)
                } else {
                    await con.query(insert_query, (err, result) => {
                        if (err) throw err;
                        console.log(result)
                    })
                    await con.query(insertHistory_query, (err, result) => {
                        if (err) throw err;
                        console.log(result)
                    })
                    res.send("permit added");
                }
            })
        }
    })
})

app.post("/removewaf", async (req,res) => {
    console.log("remove waf");
    const valve = req.body.valve;
    const waf = req.body.waf;
    const sqlSearch = "SELECT * FROM wafs WHERE waf = ?"
    const search_query = mysql.format(sqlSearch,[waf])
    const sqlInsertHistory =  "INSERT INTO systemhistory (valve, waf, action) VALUES (?,?,?)"
    const insertHistory_query = mysql.format(sqlInsertHistory,[valve, waf, "deleted waf"])
    const sqlDelete = "DELETE FROM wafs WHERE valve = ? AND waf = ?"
    const delete_query = mysql.format(sqlDelete,[valve, waf])
    await con.query(insertHistory_query, (err, result) => {
        if (err) throw err;
        console.log(result)
    })
            await con.query (delete_query, (err, result, row, fields) => {
                if (err) throw (err)
                console.log ("deleting waf " + waf + " on valve " + valve)
                console.log(result)
            }) 
            res.send("waf removed")
}); // end of app.post
    
app.post("/removepermit", async (req,res) => {
    console.log("remove permit");
    const valve = req.body.valve;
    const permit = req.body.permit;
    const sqlSearch = "SELECT * FROM permits WHERE permit = ?"
    const search_query = mysql.format(sqlSearch,[permit])
    const sqlInsertHistory =  "INSERT INTO systemhistory (valve, permit, action) VALUES (?,?,?)"
    const insertHistory_query = mysql.format(sqlInsertHistory,[valve, permit, "deleted permit"])
    const sqlDelete = "DELETE FROM permits WHERE valve = ? AND permit = ?"
    const delete_query = mysql.format(sqlDelete,[valve, permit])
    await con.query(insertHistory_query, (err, result) => {
        if (err) throw err;
        console.log(result)
    })
            await con.query (delete_query, (err, result, row, fields) => {
                if (err) throw (err)
                console.log ("deleting permit " + permit + " on valve " + valve)
                console.log(result)
            }) 
            res.send("permit removed")
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

server.listen(config.server.port); 

