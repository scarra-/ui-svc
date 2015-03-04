angular.module('messageApp.MainController', [])
    .controller('MainController', ['AuthService', function(AuthService) {
        var self = this;
        self.auth = AuthService.isLoggedIn;
    }]);
