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

            self.messages = [];

            self.auth = AuthService.isLoggedIn;
            self.user = UserService.get({id:$routeParams.username}, function() {});

            self.followButtonText = 'Loading...';
            self.followButtonDisabled = true;
            self.isFollowing = false;

            loggedInUser = localStorage.get('profile');

            if (loggedInUser) {
                $http.get(AppConfig.subscriptionServiceUrl + '/subscriptions/' + loggedInUser.login)
                    .then(function(success) {
                        console.log(success.data.following);

                        if (success.data.following.indexOf($routeParams.username) !== -1) {
                            self.followButtonText = 'Unfollow';
                            self.followButtonDisabled = false;
                            self.isFollowing = true;
                        }
                        else {
                            self.followButtonText = 'Follow';
                            self.followButtonDisabled = false;
                        }
                    }, function(failure) {
                        self.followButtonDisabled = false;
                        console.log("error loading following")
                    });
            }

            $http.get(AppConfig.contentServiceUrl + '/messages?per_page=15&owner=' + $routeParams.username)
                .then(function(success) {
                    self.messages = success.data;

                }, function(failure) {

                });

            var authHeader = { 'Authorization': 'Bearer ' + localStorage.get('token') };

            self.followUser = function () {
                console.log('follow user: ' + self.user.login );

                if (self.user.login !== loggedInUser.login) {
                    self.followButtonDisabled = true;
                    self.followButtonText = 'Loading...';

                    //if we currently dont follow this user
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
                            self.followButtonDisabled = false;
                        }, function(failure) {
                            console.log(failure.data);
                            self.followButtonDisabled = false;
                            self.followButtonText = 'Follow';
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
                            self.followButtonDisabled = false;
                        }, function(failure) {
                            console.log(failure.data);
                            self.followButtonDisabled = false;
                            self.followButtonText = 'Unfollow';
                        });

                    }
                }

            };
    }]);
