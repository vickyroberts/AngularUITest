(function(){
    'use strict';
    var angModule = angular.module('app',['ui.router','ngCookies']);
    
    angModule.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider){
        $urlRouterProvider.otherwise("/login");
        
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'app/login/loginView.html',
            controller: 'LoginController as lc'            
        })
        .state('list', {
            url: '/list',
            templateUrl: 'app/list/listView.html',            
        }); 
        
        $httpProvider.interceptors.push('AppInterceptor');   
        //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);
    
    angModule.run(['$rootScope','$location','$cookies','$http',function($rootScope,$location,$cookies,$http){
        $rootScope.globals = $cookies['globals'] || {};
        /*$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        $http.defaults.headers.common['Access-Control-Allow-Headers'] = '*';*/
        
        $rootScope.$on('$locationChangeStart', function(event, next, current){
            var restrictedPage = $.inArray($location.path(),['/landing', '/list']);
            var loggedIn = $rootScope.globals.currentUser;
            
            if(restrictedPage && !loggedIn)
            {
                $location.path('/login');
            }
        });
                
    }]);
    
})();