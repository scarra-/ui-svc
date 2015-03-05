angular.module('messageApp.LoginController', [])
    .controller('LoginController', ['AuthService', function( AuthService) {
        var self = this;


        self.login = function() {
            AuthService.login(self.user);

            self.loginError = AuthService.showError;

            console.log(self.loginError);

        };

        self.logout = function() {
            AuthService.logout();
        }
    }]);
