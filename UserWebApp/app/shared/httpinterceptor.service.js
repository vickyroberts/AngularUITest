(function(){
    'use strict';
    
   var angModule = angular.module("app");
   
   angModule.factory('AppInterceptor', ['$rootScope','$injector', function($rootScope,$injector){       
       
       
       return {
         
         request : function(config){
            if($rootScope.globals && $rootScope.globals.isAuth)
            {
                config.headers['x-session-token'] = $rootScope.globals.reqToken;
            } 
            
            return config;
         } 
       };
       
   }]);
})();