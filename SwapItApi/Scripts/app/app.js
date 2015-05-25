/// <reference path="../angular.js" />
/// <reference path="../angular-ui-router.js" />


var swapItApp = angular.module('swapItApp', ['ui.router', 'ui.bootstrap', 'LocalStorageModule', 'colorpicker.module', 'ngFileUpload']);
//swapItApp.run(['authService', function (authService) {
//    authService.fillAuthData();
//}]);
swapItApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    $urlRouterProvider.otherwise('/Item/Add');
    //$httpProvider.interceptors.push('authService');
    $stateProvider.state('Login', {
        url: '/Login',
        templateUrl: '/Login/Index'
    });
    $stateProvider.state('ConfirmEmail', {
        url: '/ConfirmEmail',
        templateUrl: '/ConfirmEmail/Index'
    });
    $stateProvider.state('NewItem', {
        url: '/Item/Add',
        templateUrl: '/Item/Add'
    });

    $stateProvider.state('ConfirmEmailSuccess', {
        url: '/ConfirmEmail/Success',
        templateUrl: '/ConfirmEmail/Success'
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
        templateUrl: '/Register/Success'
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

swapItApp.controller('ConfirmEmailCtrl', [
    '$scope', 'accountFactory', '$state', '$location', function ($scope, accountFactory, $state, $location) {
        $scope.errorData = {
            isError: false,
            errorMessage: ''
        }
        $scope.errorData.isError = false;
        $scope.errorData.errorMessage = '';
        $scope.isBusyConfirming = false;

        $scope.ConfirmEmail = {
            userId: '',
            code: '',
            password: '',
            userEmail: ''
        }
        var params = $location.search();
        if (params['userId']) {
            $scope.ConfirmEmail.userId = params['userId'];
        }

        if (params['code']) {
            $scope.ConfirmEmail.code = params['code'];
        }

        $scope.confirm = function () {
            $scope.isBusyConfirming = true;
            $scope.accessToken = '';
            var promise = accountFactory.confirmEmail($scope.ConfirmEmail.userId, $scope.ConfirmEmail.code,$scope.ConfirmEmail.userEmail, $scope.ConfirmEmail.password);
            promise.then(function() {
                    $state.go('ConfirmEmailSuccess');
                }, function(errorPayload) {
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
                }
            ).finally(function() {
                $scope.isBusyConfirming = false;
            });
        }
    }
]);

swapItApp.controller('RegisterCtrl', ['$scope', 'accountFactory', '$state', function ($scope, accountFactory, $state, $location) {
    $scope.RegisterData = {
        FirstName: '',
        LastName: '',
        DateOfBirth: '01-January-1970',
        email: '',
        password: '',
        confirmPassword: ''

    };
    $scope.isBusyRegistering = false;
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
        $scope.isBusyRegistering = true;
        var promise = accountFactory.registerUser($scope.RegisterData.email,
            $scope.RegisterData.password,
            $scope.RegisterData.confirmPassword,
            $scope.RegisterData.FirstName,
            $scope.RegisterData.LastName,
            $scope.applicationDate.dt);
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
        }).finally(function () {
            $scope.isBusyRegistering = false;
        });
    }
}]);



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
                $state.go('HomePage');
            }, function (errorPayLoad) {
                $scope.errorData.isError = true;
                $scope.errorData.errorMessage = errorPayLoad;
            }).finally(function () {
                $scope.isBusyLogginIn = false;
            });
        }
    }
]);

