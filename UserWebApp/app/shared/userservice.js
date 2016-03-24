(function(){
	'use strict';
	
	var angModule = angular.module('app');
	angModule.factory('UserService', UserService);
	UserService.$inject = ['$http'];
	
	function UserService($http){
		
		var service = {};
		
		service.GetAllUsers = GetAllUsers;
		service.AuthenticateUser = AuthenticateUser;
		//service.CreateUser = CreateUser; 
		service.AddUserDetails = AddUserDetails;
        service.GetAllUserData = GetAllUserData;
		return service;
		
		function GetAllUsers(){
			return $http.get('http://localhost:3000/api/getUsers').then(HandleSuccess, HandleError('Error while getting user list'));
		}
        
        function GetAllUserData(userId){
			return $http.get('http://localhost:3000/api/getUsers?userid=' + userId).then(HandleSuccess, HandleError('Error while getting user list'));
		}
		
		function AuthenticateUser(username, password){
			//var req = {method: 'POST',url: 'http://localhost:3000/api/authenticateuser',headers: {'Content-Type': "application/json"},data: { username: 'test', password: 'test' }};
            var dataObj = {username: username, password: password };
            var config = {headers: {'Content-Type': "application/json"}};			
			//return $http(req).then(HandleSuccess, HandleError('Error while getting user list'));
            return $http.post('http://localhost:3000/api/authenticateuser', dataObj, config).then(HandleSuccess, HandleError("Error while getting data"));
		}
        
        function AddUserDetails(userDetails){            
			//var req = {method: 'POST',url: 'http://localhost:3000/api/authenticateuser',headers: {'Content-Type': "application/json"},data: { username: 'test', password: 'test' }};
            var dataObj = {firstname: userDetails.firstName, lastname: userDetails.lastName, dateofbirth: userDetails.date, gender: userDetails.gender, username: userDetails.emailID,password: userDetails.password,address: userDetails.address,countryid: userDetails.country};
            var config = {headers: {'Content-Type': "application/json"}};			
			//return $http(req).then(HandleSuccess, HandleError('Error while getting user list'));
            return $http.post('http://localhost:3000/api/adduser', dataObj, config).then(HandleSuccess, HandleError("Error while adding user data"));
		}
		
		function HandleSuccess(res)
		{
			return res.data;
		}
		
		function HandleError(error)
		{
			return function(){
				return {success: 'Error', message : error};
			};
		}
	}
	
})();