angular.module('messageApp.UserModalController', [])
    .controller('UserModalController', [
        '$http',
        '$routeParams',
        'AuthService',
        'UserService',
        'AppConfig',
        'localStorageService',
        'SubscriptionService',
        function ($http, $routeParams, AuthService, UserService, AppConfig, localStorage, SubscriptionService) {
            var self = this;

            self.auth = AuthService.isLoggedIn;
            self.user = UserService.get({id:$routeParams.username}, function() {});

            self.followButtonText = 'Follow';
            self.isFollowing = false;

            profile = localStorage.get('profile');

            $http.get(AppConfig.subscriptionServiceUrl + '/subscriptions/' + profile.login)
                .then(function(success) {

                    if (success.data.following.indexOf($routeParams.username) !== -1) {
                        self.followButtonText = 'Unfollow';
                        self.isFollowing = true;
                    }
                }, function(failure) {

                });

            var authHeader = { 'Authorization': 'Bearer ' + localStorage.get('token') };

            self.followUser = function () {
                console.log('follow user: ' + self.user.login);
                if (self.isFollowing === false) {
                    $http.post(
                        AppConfig.subscriptionServiceUrl + '/subscribe',
                        {"username" : $routeParams.username},
                        {headers : authHeader}
                    )
                    .then(function(success) {
                        console.log(success.data);
                        self.isFollowing = true;
                        self.followButtonText = 'Unfollow';
                    }, function(failure) {
                        console.log(failure.data);
                    });
                } else {
                    $http.post(
                        AppConfig.subscriptionServiceUrl + '/unsubscribe',
                        {"username" : $routeParams.username},
                        {headers : authHeader}
                    )
                    .then(function(success) {
                        console.log(success.data);
                        self.isFollowing = false;
                        self.followButtonText = 'Follow';
                    }, function(failure) {
                        console.log(failure.data);
                    });
                }
            };
    }]);
