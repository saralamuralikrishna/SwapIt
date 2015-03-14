/// <reference path="../angular.js" />
/// <reference path="../angular-ui-router.js" />


var swapItApp = angular.module('swapItApp', ['ui.router']);

swapItApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
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

swapItApp.controller('RegisterCtrl', ['$scope','accountFactory', function ($scope,accountFacotry) {
    $scope.RegisterData = {
        email: '',
        password: '',
        confirmPassword: ''
    };

    $scope.errorData = {
        isError: false,
        errorMessage: ''
    }

    $scope.register = function () {
        $scope.errorData.isError = false;
        $scope.errorData.errorMessage = '';
        var promise = accountFacotry.registerUser($scope.RegisterData.email, $scope.RegisterData.password, $scope.RegisterData.confirmPassword);
        promise.then(function (payload, status, headers, config) {
            
        }, function (errorPayload) {
            $scope.errorData.isError = true;
            $scope.errorData.errorMessage = errorPayload.Message;
            if (errorPayload.ModelState) {
                var keys = Object.keys(errorPayload.ModelState);
                for (var key=0;key< keys.length;key++) {
                    for (var len = 0; len < errorPayload.ModelState[keys[key]].length; len++) {
                        $scope.errorData.errorMessage += '\\n' + errorPayload.ModelState[keys[key]][len];
                    }
                }
            }
            console.log(errorPayload);
        });
    }
}]);


swapItApp.factory('accountFactory', ['$http', '$q',
    function ($http, $q) {
        var login = function (userName, passWord) {
            var deferred = $q.defer();
            var loginData = {
                grant_type: 'password',
                username: userName,
                password: passWord
            };
            var req = {
                method: 'POST',
                url: "/Token",
                withCredentials: true,
                data: loginData
            }
            $http(req).success(deferred.resolve).error(deferred.reject);
            return deferred.promise;
        };

        var registerUser = function (email, password, confirmPassword) {
            var deferred = $q.defer();
            var loginData = {
                grant_type: 'password',
                Email: email,
                Password: password,
                ConfirmPassword: confirmPassword
            };
            var req = {
                method: 'POST',
                url: "/api/Account/Register",
                withCredentials: true,
                data: loginData
            }
            $http(req).success(deferred.resolve).error(deferred.reject);
            return deferred.promise;
        }

        return {
            login: login,
            registerUser: registerUser
        }
    }
]);