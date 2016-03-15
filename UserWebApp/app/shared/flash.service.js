(function(){
    'use strict';    
    
    var angMod = angular.module('app');
    
    angMod.factory('FlashService', ['$rootScope', function($rootScope){
        var service = {};
        
        service.Success = Success;
        service.Error = Error;        
        
        initService();
        return service;
        
        function initService(){
            $rootScope.$on('$locationChangeStart', function (){
                clearFlashMessage();
            });
            
             function clearFlashMessage() {
                var flash = $rootScope.flash;
                if (flash) {
                    if (!flash.keepAfterLocationChange) {
                        delete $rootScope.flash;
                    } else {
                        // only keep for a single location change
                        flash.keepAfterLocationChange = false;
                    }
                }
            }
        };
        
        function Success(message, keepAfterLocationChange)
        {
            $rootScope.flash = {message: message, 
                keepAfterLocationChange:keepAfterLocationChange,
            type:'success'};
        };
        
        function Error(message, keepAfterLocationChange)
        {
            $rootScope.flash = {message: message, 
                keepAfterLocationChange:keepAfterLocationChange,
            type:'error'};
        };
        
    }]);
    
})();