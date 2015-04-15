/// <reference path="../angular.js" />
/// <reference path="../angular-ui-router.js" />


var swapItApp = angular.module('swapItApp', ['ui.router', 'ui.bootstrap']);

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
    $stateProvider.state('HomePage', {
        url: '/Home',
        templateUrl: '/Home/Main'
    });
    $stateProvider.state('RegistrationSuccess', {
        url: '/RegistrationSucess',
        templateUrl:'/Register/Success'
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

swapItApp.controller('RegisterCtrl', ['$scope', 'accountFactory','$state', function ($scope, accountFactory, $state) {
    $scope.RegisterData = {
        FirstName: '',
        LastName: '',
        DateOfBirth: '01-January-1970',
        email: '',
        password: '',
        confirmPassword: ''

    };

    $scope.applicationDate = {
        minDate: null,
        dateOptions: {
            formatYear: 'yy',
            startingDay: 1
        },
        maxDate: new Date(),
        dt: new Date(),
        formats: ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'],
    }

    $scope.applicationDate.format = $scope.applicationDate.formats[0];

    $scope.errorData = {
        isError: false,
        errorMessage: ''
    }

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };


    $scope.register = function () {
        $scope.errorData.isError = false;
        $scope.errorData.errorMessage = '';
        var promise = accountFactory.registerUser($scope.RegisterData.email,
            $scope.RegisterData.password,
            $scope.RegisterData.confirmPassword,
            $scope.RegisterData.FirstName,
            $scope.RegisterData.LastName,
            $scope.RegisterData.Address,
            $scope.applicationDate.dt,
            $scope.RegisterData.PostCode,
            $scope.RegisterData.HouseNumber);
        promise.then(function (payload, status, headers, config) {
            $state.go('RegistrationSuccess');
        }, function (errorPayload) {
            $scope.errorData.isError = true;
            $scope.errorData.errorMessage = errorPayload.Message;
            if (errorPayload.ModelState) {
                var keys = Object.keys(errorPayload.ModelState);
                for (var key = 0; key < keys.length; key++) {
                    for (var len = 0; len < errorPayload.ModelState[keys[key]].length; len++) {
                        $scope.errorData.errorMessage += '\\n' + errorPayload.ModelState[keys[key]][len];
                    }
                }
            }
        });
    }
}]);

swapItApp.service('navbarService', function() {
    var navbarService = this;
    navbarService.isLoggedIn = false;
    navbarService.SetLoggedIn = function(val) {
        navbarService.isLoggedIn = val;
    };
    navbarService.GetLoggedIn = function() {
        return navbarService.isLoggedIn;
    }
});

swapItApp.controller('NavbarCtrl', ['$scope', 'navbarService', function ($scope, navbarService) {
    $scope.isLoggedIn = navbarService.GetLoggedIn();
    $scope.$watch(function () { return navbarService.isLoggedIn; }, function (newVal, oldVal) {
        if (typeof newVal !== 'undefined') {
            $scope.isLoggedIn = navbarService.isLoggedIn;
        }
    });
}]);

swapItApp.controller('LoginCtrl', [
    '$scope', 'accountFactory', '$state', 'navbarService', function ($scope, accountFactory, $state, navbarService) {
        $scope.loginData =
        {
            userName: '',
            password: ''
        }
        $scope.isBusyLogginIn = false;
        $scope.errorData = {
            isError: false,
            errorMessage: ''
        }

        $scope.login = function () {
            $scope.isBusyLogginIn = true;
            $scope.errorData.isError = false;
            var promise = accountFactory.login($scope.loginData.userName, $scope.loginData.password);
            promise.then(function (payLoad) {
                localStorage.setItem('token', payLoad.access_token);
                localStorage.setItem('userName', payLoad.userName);
                localStorage.setItem('tokenType', payLoad.token_type);
                navbarService.SetLoggedIn(true);
                $state.go('HomePage');
            }, function(errorPayLoad) {
                $scope.errorData.isError = true;
                $scope.errorData.errorMessage = errorPayLoad;
            }).finally(function () {
                $scope.isBusyLogginIn = false;
            });
        }
    }
]);

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
                data: 'userName=' + userName + '&password=' + passWord + '&grant_type=password'
        }
            $http(req).success(deferred.resolve).error(deferred.reject);
            return deferred.promise;
        };

        var registerUser = function (email, password, confirmPassword, firstName, lastName, address, dateOfBirth, postCode, houseNumber) {
            var deferred = $q.defer();
            var loginData = {
                grant_type: 'password',
                Email: email,
                Password: password,
                ConfirmPassword: confirmPassword,
                FirstName: firstName,
                LastName: lastName,
                DateOfBirth: dateOfBirth,
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