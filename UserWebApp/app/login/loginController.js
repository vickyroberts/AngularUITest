(function(){
	'user strict';
	
	var angModule = angular.module('app');
	
	angModule.controller('LoginController', ['$location','AuthService','$state','$stateParams','FlashService','localStorageService',
		function($location,AuthService,$state,$stateParams,FlashService,localStorageService){
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
                        if(typeof $stateParams.returnState==='undefined' || !$stateParams.returnState)
                        {
						    $state.go('landing.listuser');                            
                        }
                        else
                        {
                            $state.go($stateParams.returnState, $stateParams.returnParams);
                        }
                        AuthService.SetCredentials(lc.txtUserName, lc.txtPassword);
                        SetCountryList();
					}
					else
					{
						lc.dataloading = false;
                        $state.go('login');
                        FlashService.Error("Username or password is incorrect", false);
					}
				});
			}	
            
            function SetCountryList()
            {
                if(localStorageService.isSupported)
                {           
                    var countryStorageList = localStorageService.get('countryList');
                    if(!countryStorageList)
                    {         
                        var countryList = [{countryId:"1", countryName:"India"},{countryId:"2", countryName:"USA"},{countryId:"3", countryName:"Pakistan"},{countryId:"4", countryName:"Australia"},{countryId:"5", countryName:"Japan"}];
                        localStorageService.set('countryList', countryList);
                    }
                }      
            }
		}]);
})();