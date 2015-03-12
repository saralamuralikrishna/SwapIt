/// <reference path="../angular.js" />
/// <reference path="../angular-ui-router.js" />


var swapItApp = angular.module('swapItApp', ['ui.router']);


swapItApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/Login');

    $stateProvider.state('Login', {
        url: '/Login',
        templateUrl: '/Login/Index'
    });
    $stateProvider.state('Register', {
        url: '/Register',
        templateUrl: '/Register/Index'
    });
    $stateProvider.state('Help',
        {
            url: '/Help',
            templateUrl: '/Help'
        }
    );
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);


swapItApp.factory('LoginFactory', ['$http','$q',
    function($http,$q) {
        var login = function(loginData) {
            
        }
    }
]);