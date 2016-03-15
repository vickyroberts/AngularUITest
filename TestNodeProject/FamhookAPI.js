var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var busboy = require('connect-busboy');
var userRoutes = require('./Router/UserRoutes.js');
var passport = require('passport');
var session = require('express-session');
var logger = require("./logger");
var ejs = require('ejs');

var app = express();

logger.debug("Application initiating...");

app.use(busboy());

//process.on('uncaughtException', function (err) {
//  console.log('Caught exception: ' + err);
//});

// Set view engine to ejs
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// Use the passport package in our application
app.use(passport.initialize());
// Use express session support since OAuth2orize requires it
var date = new Date();
var appendToExternalId = date.getDate()+"v"+date.getMonth()+"r"+date.getFullYear();
app.use(session({  
  secret: appendToExternalId + 'fverh',
  saveUninitialized: true,
  resave: false
}));

app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Access-Control-Allow-Headers, Content-Type, Accept, Key, Authorization");
      next();
});

app.use('/api',userRoutes);

var port = 3000;

app.listen(port);
logger.debug("Application started at port " + port + ".. !!!");
console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");


//NEED TO UN-COMMENT IN PRODUCTION
process.on('uncaughtException', function (err) {
  console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
  console.error(err.stack);
  logger.debug("UncaughtException :: " + err);
  process.setMaxListeners(0);
  process.exit(1);
});

  
  
 