angular.module('messageApp.LoginController', [])
    .controller('LoginController', ['AuthService', function( AuthService) {
        var self = this;

        self.login = function() {
            AuthService.login(self.user);
            AuthService.setUser(self.user);
        };

        self.logout = function() {
            AuthService.logout();
        }
    }]);
