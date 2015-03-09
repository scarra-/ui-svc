angular.module('messageApp.MainController', [])
    .controller('MainController', ['AuthService', 'InitService', '$routeParams', function(AuthService, InitService, $routeParams) {
        var self = this;
        self.auth = AuthService.isLoggedIn;
        self.showUserModal = function() {
            if ($routeParams.username) {
                return true;
            }
            return false;
        };;

    }]);
