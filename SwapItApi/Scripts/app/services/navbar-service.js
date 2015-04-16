(function() {
    function navbarSrv() {
        var navbarService = this;
        navbarService.isLoggedIn = false;
        navbarService.SetLoggedIn = function (val) {
            navbarService.isLoggedIn = val;
        };
        navbarService.GetLoggedIn = function () {
            return navbarService.isLoggedIn;
        }
    };
    angular.module('swapItApp')
        .service('navbarService', navbarSrv);
})();