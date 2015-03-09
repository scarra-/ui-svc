angular.module('messageApp.UserModalController', [])
    .controller('UserModalController', [
        '$http',
        '$routeParams',
        'AuthService',
        'UserService',
        'AppConfig',
        function ($http, $routeParams, AuthService, UserService, AppConfig) {
            var self = this;

            self.auth = AuthService.isLoggedIn;
            self.user = UserService.get({id:$routeParams.username}, function() {});

            self.followUser = function () {
                console.log('follow user: ' + self.user.login);
                $http.post(AppConfig.subscriptionServiceUrl+'/subscribe').then(function(success) {
                    console.log(success.data);
                }, function(failure) {
                    console.log(failure.data);
                });
            };
    }]);
