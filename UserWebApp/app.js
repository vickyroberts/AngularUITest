(function(){
    'use strict';
    var angModule = angular.module('app',['ui.router','ngCookies', '720kb.datepicker', 'angular-loading-bar','LocalStorageModule','ngAnimate']);
    
    angModule.config(['$stateProvider', '$urlRouterProvider', '$httpProvider','localStorageServiceProvider','cfpLoadingBarProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider,localStorageServiceProvider,cfpLoadingBarProvider){
        
        localStorageServiceProvider.setPrefix('uiapp');
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 500;
        $urlRouterProvider.otherwise("/login");        
        
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'app/login/loginView.html',
            controller: 'LoginController as lc'            
        })
        .state('landing', {            
            url: '/landing',
           templateUrl: 'app/landingpage/landing.view.html'           
                     
        })
        .state('landing.newuser',{
            url:'/users',
            templateUrl:'app/usermanagement/useradd.view.html',
            controller: 'AddUserController as auc'
        })
        .state('edituser',{
            url:'/users/:userId',
            templateUrl:'app/usermanagement/useradd.view.html',
            controller: 'AddUserController as auc'
        })
        .state('landing.listuser',{
            url:'/newuser',
            templateUrl:'app/usermanagement/userlist.view.html',
            controller: 'UserlistController as ulc'
        }); 
        
        $httpProvider.interceptors.push('AppInterceptor'); 
        
       
        //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);
    
    angModule.run(['$rootScope','$location','$cookies','$http','$state','cfpLoadingBar',function($rootScope,$location,$cookies,$http,$state,cfpLoadingBar){
        $rootScope.globals = $cookies['globals'] || {};
        /*$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        $http.defaults.headers.common['Access-Control-Allow-Headers'] = '*';*/
        /* $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams){
             if(toState.name === 'landing')
             {
                 $state.go('.listuser');
             }
         });*/
        $rootScope.$on('$locationChangeStart', function(event, next, current){
            var restrictedPage = $.inArray($location.path(),['/landing', '/list','/landing/users']);
            var loggedIn = $rootScope.globals.currentUser;
            
            if(restrictedPage > -1 && !loggedIn)
            {
                $location.path('/login');
            }
        });
        
         $rootScope.start = function() {
         cfpLoadingBar.start();
        };

        $rootScope.complete = function () {
            cfpLoadingBar.complete();
        };  
                
    }]);
    
})();