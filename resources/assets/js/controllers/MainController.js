angular.module('messageApp.MainController', [])
    .controller('MainController', ['AuthService', 'InitService', function(AuthService, InitService) {
        var self = this;
        self.auth = AuthService.isLoggedIn;

    }]);
