angular.module('messageApp.UserModalController', [])
    .controller('UserModalController', [
        '$http',
        '$routeParams',
        'AuthService',
        'UserService',
        'AppConfig',
        'localStorageService',
        function ($http, $routeParams, AuthService, UserService, AppConfig, localStorage) {
            var self = this;

            self.auth = AuthService.isLoggedIn;
            self.user = UserService.get({id:$routeParams.username}, function() {});

            var authHeader = { 'Authorization': 'Bearer ' + localStorage.get('token') };

            self.followUser = function () {
                console.log('follow user: ' + self.user.login);
                $http.post(
                    AppConfig.subscriptionServiceUrl + '/subscribe',
                    {"username" : $routeParams.username},
                    {headers : authHeader}
                )
                .then(function(success) {
                    console.log(success.data);
                }, function(failure) {
                    console.log(failure.data);
                });
            };
    }]);
