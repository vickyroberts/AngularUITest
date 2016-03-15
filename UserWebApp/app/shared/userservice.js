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
		
		return service;
		
		function GetAllUsers(){
			return $http.get('http://localhost:3000/api/getUsers').then(HandleSuccess, HandleError('Error while getting user list'));
		};
		
		function AuthenticateUser(username, password){
			//var req = {method: 'POST',url: 'http://localhost:3000/api/authenticateuser',headers: {'Content-Type': "application/json"},data: { username: 'test', password: 'test' }};
            var dataObj = {username: username, password: password };
            var config = {headers: {'Content-Type': "application/json"}};			
			//return $http(req).then(HandleSuccess, HandleError('Error while getting user list'));
            return $http.post('http://localhost:3000/api/authenticateuser', dataObj, config).then(HandleSuccess, HandleError("Error while getting data"));
		};
		
		function HandleSuccess(res)
		{
			return res.data;
		}
		
		function HandleError(error)
		{
			return function(){
				return {success: 'Error', message : error};
			}
		}
	};
	
})();