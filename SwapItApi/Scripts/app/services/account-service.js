(function () {
    function accountFactory($http, $q, localStorageService) {
        var authentication = {
            isAuth: false,
            userName: ""
        };

        var accountFactoryService = {};
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
            $http(req)
                .success(function (response) {
                    localStorageService.set('authorizationData',
                        {
                            token: response.access_token,
                            userName: userName,
                            tokenType: response.token_type
                        });
                    deferred.resolve(response);
                })
                .error(function (errorResponse, status) {
                    logOut();
                    deferred.reject(errorResponse);
                });
            return deferred.promise;
        };


        var logOut = function () {

            localStorageService.remove('authorizationData');

            authentication.isAuth = false;
            authentication.userName = "";

        };

        var confirmEmail = function (userId, code, userEmail, userPassword) {
            var deferred = $q.defer();
            var confirmData = {
                userId: userId,
                code: code,
                userEmail: userEmail,
                userPassword: userPassword
            };
            var req = {
                method: 'POST',
                url: '/api/Account/ConfirmEmail',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: $.param(confirmData)
            }
            $http(req).success(deferred.resolve).error(deferred.reject);
            return deferred.promise;
        };

        var registerUser = function (email, password, confirmPassword, firstName, lastName, dateOfBirth) {
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

        var fillAuthData = function () {

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                authentication.isAuth = true;
                authentication.userName = authData.userName;
            }

        }


        accountFactoryService.login = login;
        accountFactoryService.registerUser = registerUser;
        accountFactoryService.confirmEmail = confirmEmail;
        accountFactoryService.fillAuthData = fillAuthData;

        return accountFactoryService;
    };
    angular.module('swapItApp')
        .factory('accountFactory', ['$http', '$q', 'localStorageService', accountFactory]);
})();