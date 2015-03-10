angular.module('messageApp.LoginController', [])
    .controller('LoginController', ['AuthService', function( AuthService) {
        var self = this;

         self.buttonText = AuthService.showButtonName;
        // self.disabled   = false;

        self.login = function() {
            AuthService.login(self.user);
            self.loginError = AuthService.showError;
            self.buttonText = AuthService.showButtonName;
            self.disable = AuthService.changeButtonState;
            self.internalError = AuthService.internalError;
        };

        self.logout = function() {
            AuthService.logout();
        }
    }]);
