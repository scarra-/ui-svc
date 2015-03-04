angular.module('messageApp.MainController', [])
    .controller('MainController', ['LoggedInService', function(LoggedInService) {
        var self = this;
        self.auth = LoggedInService.isLoggedIn;
    }]);
