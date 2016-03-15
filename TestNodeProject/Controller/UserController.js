//Default packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var promise = require("bluebird");
var pg = require('pg');
var fs = require('fs');
var gm = require('gm');
//Custom packages
var logger = require("../logger");
var conn = require("./PgHelper.js");
var utility = require("./Utility.js");

promise.promisifyAll(bcrypt);
promise.promisifyAll(pg);


exports.getUsers = function(req,res)
{
  logger.debug("getUsers :: In the function");
  if(req.body && req.query)
  {
    
    var pgSchemaName = conn.getDBSchema('');
    conn.getPGConnection(function(err, clientConn){
      if(err)
      {
        logger.debug('getUsers :: Error while initiating the connection ' + err);
        console.log('getUsers :: Error while initiating the connection ' + err);
      }
      else
      {
        var userQuery = "";
        
        if(req.query.userid)
        {
          userQuery = "SELECT u.*, c.country_name FROM "+pgSchemaName+".tbuser u left join "+pgSchemaName+".tbcountry c on u.country_id = c.country_id WHERE u.user_id = "+ req.query.userid;          
        }
        else
        {
          userQuery = "SELECT u.*, c.country_name FROM "+pgSchemaName+".tbuser u left join "+pgSchemaName+".tbcountry c on u.country_id = c.country_id";
        }
        
        clientConn.queryAsync(userQuery).then(function(result){
          if(result && result.rows && result.rows.length > 0)
          {
            var userList = '{"userinfo":[';
            result.rows.forEach(function(row) 
            {
                userList = userList + '{"userId":"' + row.user_id + '", "firstName": "'+ row.first_name +'", "lastName":"'+ row.last_name 
                +'", "gender":"'+row.gender+'", "address":"' + row.address + '", "profilePic":"'+ row.profile_pic +'", "countryName":"' + row.country_name + '"}';
            }, this);
            userList = userList+"]}"
            
            res.json({status:'Success',result:JSON.parse(userList)});
          }
          else
          {
            res.json({status:'Success',message:'User not found'});  
          }
        }).catch(function(err){
          logger.debug('getUsers :: Error while getting users list ' + err);
          console.log('getUsers :: Error while getting users list ' + err);
          res.json({status:'Error',message:'Error while getting users list.'});
        });
      }
    });
      
  }  
  else
  {
    res.json({status:'error',userinfo:[{username:"Test"},{username:"Test2"},{username:"Test3"}]});
  }
  logger.debug("getUsers :: Exit the function");
};

// Check if the user exists and return the message.
exports.postUserLogin = function(req, res) {  
  // Set the client properties that came from the POST data
  if(req.body && req.body.username && req.body.password)
  {
    var userName = req.body.username;
    var password = req.body.password;
    
    var pgSchemaName = conn.getDBSchema('');
    conn.getPGConnection(function(err, clientConn){
      if(err)
      {
        logger.debug('postUserLogin :: Error while initiating the connection ' + err);
        console.log('postUserLogin :: Error while initiating the connection ' + err);
      }
      else
      {
        var userQuery = "";
        userQuery = "SELECT u.* FROM "+pgSchemaName+".tbuser u left join "+pgSchemaName+".tbusersecurity us on u.user_id = us.user_id WHERE us.user_name = '" + userName + "' AND us.password='" + password + "'";         
                
        clientConn.queryAsync(userQuery).then(function(result){
        if(result && result.rows && result.rows.length > 0)
        { 
            var userQuery = "";
            userQuery = "";
            var sessionIDVal = req.sessionID;
            var tokenId = utility.generateRandomUId(15);
            var insertQuery = "UPDATE "+pgSchemaName+".tbusersecurity SET session_id = '" + sessionIDVal + "', token_id ='" + tokenId + "' WHERE user_id = " + result.rows[0].user_id + " RETURNING user_id";
            clientConn.queryAsync(insertQuery).then(function(result)
            {
                if(result && result.rows && result.rows.length > 0)
                {
                    res.status(200);
                    res.json({status:'success',message:'User authentication passed',tokenId: tokenId});   
                }
                else
                {
                    res.status(500);
                    res.json({status:'fail',message:'Failed while creating user token'});                    
                }                
            }).catch(function(err){
                logger.debug('postUserLogin :: Error while adding token ' + err);
                console.log('postUserLogin :: Error while adding token ' + err);
                res.status(500);
                res.json({status:'error',message:'Error while updating token'});
            });
        }
        else
        {
          res.status(401);
          res.json({status:'fail',message:'User authentication failed'});  
        }
        }).catch(function(err){
          logger.debug('postUserLogin :: Error while checking authentication ' + err);
          console.log('postUserLogin :: Error while checking authentication ' + err);
          res.status(500);
          res.json({status:'error',message:'Error while checking authentication.'});
        });
      }
    });    
  }    
};   

