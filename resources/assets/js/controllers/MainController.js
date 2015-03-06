angular.module('messageApp.MainController', [])
    .controller('MainController', ['AuthService', function(AuthService) {
        var self = this;
        self.auth = AuthService.isLoggedIn;

        self.init = function() {
            if (window.localStorage.getItem('bootcamp.token') !== null) {
                // NOT SURE IF IT SHOULD BE HERE
                AuthService.authenticate();
            }
        }
    }]);
