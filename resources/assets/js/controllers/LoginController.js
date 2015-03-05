angular.module('messageApp.LoginController', [])
    .controller('LoginController', ['AuthService', function( AuthService) {
        var self = this;

        self.login = function() {
            AuthService.login(self.user);
            self.loginError = AuthService.showError;
        };

        self.logout = function() {
            AuthService.logout();
        }
    }]);
