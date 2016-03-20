(function(){
    'use strict';
    
   var angModule = angular.module("app");
   
   angModule.factory('AppInterceptor', ['$rootScope','$injector','cfpLoadingBar', function($rootScope,$injector,cfpLoadingBar){       
       
       
       return {
         
         request : function(config){
            if($rootScope.globals && $rootScope.globals.isAuth)
            {
                config.headers['x-session-token'] = $rootScope.globals.reqToken;
            } 
            cfpLoadingBar.start();
            return config;
         },
        response: function(response)
        {
             cfpLoadingBar.complete();
             return response;
        }
          
       };
       
       
   }]);
})();