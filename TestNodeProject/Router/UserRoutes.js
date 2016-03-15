var express = require('express');
var userController = require('../Controller/UserController.js');

var logger = require("../logger");


var router = express.Router();

try
{
    router.get('/',function(req,res){res.status(400), res.json({message:'Invalid url'})});

    router.get('/getUsers', userController.getUsers);
    
    router.post('/authenticateuser', userController.postUserLogin); 
}
catch(err)
{
    logger.debug('Error while setting the routes ' + err);
}
//router.get('/getUsers', userController.getUsers);

/*  
//Register user details.
router.post('/postUserLogin', userController.postUserRegister);  

//Login user
router.route('/loginUser')
    .post(authController.isAuthenticated, userController.postUserLogin);

//Activate user account
router.get('/activateacct', userController.updateUserStatus);
  
    
//Register user details.
router.post('/uploadpicture', userController.profilePicUpload); 

router.route('/clients')
    .post(authController.isAuthenticated, clientController.postClients)
    .get(authController.isAuthenticated, clientController.getClients);
*/

module.exports = router;
	