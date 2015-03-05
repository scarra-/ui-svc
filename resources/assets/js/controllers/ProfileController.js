angular.module('messageApp.ProfileController', [])
    .controller('ProfileController', ['AuthService', function(AuthService) {
        var self = this;
        self.login = AuthService.user.login;
        self.auth = AuthService.isLoggedIn;
    }]);
