require('angular/angular.min');
require('angular-resource/angular-resource.min');
require('angular-route/angular-route.min');
require('pusher-angular');

function AuthService() {
    var isLoggedIn = false;

    this.isLoggedIn = function() {
        console.log(window.sessionStorage);
        if (typeof window.sessionStorage.token != 'undefined') {
            isLoggedIn = true;

        }
        console.log(isLoggedIn);
        return isLoggedIn;
    };

    this.login = function() {
        console.log("login caled");
        isLoggedIn = true;
    };

    this.logout = function() {
        isLoggedIn = false;
        console.log("calling logout");
    };
}


function StreamService() {
    var messages = [];

    this.getMessages = function() {
        return messages;
    };

    this.addMessage = function(message) {
        messages.push(message);
    };

    this.clearMessages = function() {
        messages = [];
    }
}

var userApp = angular.module('userApp', ['ngRoute', 'ngResource', 'pusher-angular'])
    .factory('UserService', ['$resource', function($resource) {
        return $resource(window.userServiceUrl+'/users/:id', {id:'@id'}, {
            update: {method: 'PUT'}
        });
    }])
    .service('LoggedInService', [AuthService])

    .service('MessageStreamService', [StreamService])

    .controller('MainController', ['LoggedInService', function(LoggedInService) {
        var self = this;
        self.auth = LoggedInService.isLoggedIn;
    }])

    .controller('RegisterController', ['$scope', 'UserService', function($scope, UserService) {
        var self = this;

        self.registerUser = function() {
            var user = new UserService(self.user);
            user.$save(function(success) {
                self.user = {};
            }, function(failure) {
                console.log(failure.data);
                // registrationForm.email'].$invalid = true;
                $scope.registrationForm.email.$setValidity('email',false);
            });
        };
    }])
    .controller('LoginController', ['$http', 'LoggedInService', 'MessageStreamService', function($http, LoggedInService, MessageStreamService) {
        var self = this;

        self.login = function() {
            console.log(self.user);
            $http.post(window.userServiceUrl+'/authenticate', self.user).then(function(response) {
               window.sessionStorage.token = response.data.token;
               LoggedInService.login();
               MessageStreamService.clearMessages();

            }, function(errorResponse) {
                console.log(errorResponse.data);
            });
        };
        self.logout = function() {
            console.log("logging out");
            LoggedInService.logout();
            delete window.sessionStorage.token;
            console.log(window.sessionStorage.token);

        }
    }])
    .controller('MsgController', ['$http', function($http) {
        var self = this;

        self.sendMessage = function() {
            console.log(self.msg);
            $http.post(window.contentServiceUrl+'/messages', self.msg).then(function() {gi


            }, function(errorResponse) {
                console.log(errorResponse.data);
            });
        };
    }])
    .controller('PusherController', ['MessageStreamService', '$pusher', function (MessageStreamService, $pusher) {
        var self = this;
        var client = new Pusher('7b0cc00ab6716c7191b4');
        var pusher = $pusher(client);
        var my_channel = pusher.subscribe('public_channel');
        /**
         * '$scope.tweets' variable should receive history of last 20 tweets when user enters login page.
         * then while he is entering login information, tweet array will be updated with new tweets
         */
        self.tweets = MessageStreamService.getMessages;
        MessageStreamService.addMessage({name: "Karlis", message: "hello! my name is Karlis", time: "Monday 2nd of March 2015 07:21:53 PM"});
        my_channel.bind('new_tweet', function (data) {
                // self.tweets.unshift(data);
                //console.log(data);
            }
        );
    }]);
// require('./my-pusher');
