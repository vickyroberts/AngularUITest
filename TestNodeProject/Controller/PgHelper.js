var mongoose = require('mongoose');
var pg = require('pg');
var redis = require('redis');
var logger = require("../logger");

var pgConString = "postgres://user1:user1@localhost:5444/UserDetails";


exports.getPGConnection = function(callback)
{
	try
	{
		var client = new pg.Client(pgConString);
		client.connect(function(err){
			if(err)
			{
				console.log("Error while PG connection" + err);
				logger.debug("Error while connecting to PG" + err);
				callback(err);
			}
			else
			{
				callback(null,client);
			}
		});
	}
	catch(err)
	{
		console.log("Error while PG connection" + err);
		logger.debug("Error while connecting to PG" + err);
	}
};

exports.rollback = function(client) 
{
  //terminating a client connection will
  //automatically rollback any uncommitted transactions
  //so while it's not technically mandatory to call
  //ROLLBACK it is cleaner and more correct
  client.query('ROLLBACK', function() {
    client.end();
  });
};


exports.getDBSchema = function(username)
{
	return "userinfo";	
};