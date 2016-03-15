(function(){
	var angModule = angular.module('app');
	angModule.factory('AuthService', AuthService);
	AuthService.$inject = ['$http', '$cookies', '$q','$rootScope','$filter', 'UserService'];
	
	function AuthService($http, $cookies, $q, $rootScope,$filter, UserService)
	{
		var service = {};
		
		service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials; 	
		
		return service;
		
		function Login(username, password, callback)
		{	
            		
			UserService.AuthenticateUser(username, password).then(function(userInfo)
            {                
				var response; 
                if(userInfo && userInfo.status && $filter('lowercase')(userInfo.status) == "success")
                {
                    $rootScope.sesTokenId = userInfo.tokenId;
                    response = {success: true};
                }
                else
                {
                    response = {success:false,message:"Username or password is incorrect"};
                }
                              
				callback(response);                
			});
		};
        
        function SetCredentials(username, password)
        {
            $rootScope.globals = {currentUser:{username:username, password:password}, isAuth:true, reqToken : $rootScope.sesTokenId};
            $cookies.put('globals', $rootScope.globals);
        };
        
        function ClearCredentials()
        {
            $rootScope.globals = {};
            $cookies.remove("globals");
        };
	};
})();