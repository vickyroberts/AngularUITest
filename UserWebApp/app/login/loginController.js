(function(){
	'user strict';
	
	var angModule = angular.module('app');
	
	angModule.controller('LoginController', ['$location','AuthService','FlashService',
		function($location,AuthService,FlashService){
			var lc = this;		
			lc.Login = Login;
			
            (function initController() {
            // reset login status
                    lc.dataloading = false;
                    AuthService.ClearCredentials();
             })();
            
			function Login()
			{
				lc.dataloading = true;			
				
				AuthService.Login(lc.txtUserName, lc.txtPassword, function(response){
					if(response.success)
					{
						$location.path('/list');
                        AuthService.SetCredentials(lc.txtUserName, lc.txtPassword);
					}
					else
					{
						lc.dataloading = false;
                        $location.path('/login');
                        FlashService.Error("Username or password is incorrect", false);
					}
				});
			}	
		}]);
})();