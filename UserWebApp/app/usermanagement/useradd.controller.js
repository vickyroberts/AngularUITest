(function(){
    var angModule = angular.module('app');    
    
    angModule.controller('AddUserController', ['$scope','UserService','FlashService','localStorageService','cfpLoadingBar',function($scope,UserService,FlashService,localStorageService,cfpLoadingBar){
        
        var auc = this;
        auc.AddUserDetails = AddUserDetails;       
                
        auc.countryList = [];
        auc.country = null;  
        
        (function initController(){
            auc.gender = "M";
            auc.countryList = localStorageService.get('countryList');
        })();      
             
        
        function AddUserDetails(){
            
            var userData = {};
            userData.firstName = auc.firstName;
            userData.lastName = auc.lastName;
            userData.gender = (auc.gender == "M")? 1 : 2;
            userData.date = auc.date;
            userData.address = auc.address;
            userData.country = auc.country;
            userData.emailID = auc.emailID;
            userData.password = auc.password;
            
            UserService.AddUserDetails(userData).then(function(retData){
                if(retData && retData.status == "success")
                {
                    FlashService.Success("User added successfully");
                }
                else
                {
                    FlashService.Error("Error while adding user", false);
                }
            });
           
        };
        
    }]);
    
})();