(function () {
    function accountFactory($http, $q) {
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
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
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

        return {
            login: login,
            registerUser: registerUser,
            confirmEmail: confirmEmail
        }
    };
    angular.module('swapItApp')
        .factory('accountFactory', ['$http', '$q', accountFactory]);
})();