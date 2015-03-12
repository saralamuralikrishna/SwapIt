/// <reference path="../angular.js" />
var startApp = angular.module('startApp', []);

starApp.controller('itemsController', [
    '$scope','$http', function ($scope, $http) {
        $scope.dataResult = null;
    }
]);