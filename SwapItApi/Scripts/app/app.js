/// <reference path="../angular.js" />
/// <reference path="../angular-ui-router.js" />


var swapItApp = angular.module('swapItApp', ['ui.router']);


swapItApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider,$httpProvider) {
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
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


swapItApp.factory('LoginFactory', ['$http','$q','$localstorage',
    function($http,$q) {
        var login = function(loginData) {
            var deffer = $q.defer();
            //$http.get()
        }
    }
]);