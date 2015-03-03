require('angular/angular.min');
require('angular-resource/angular-resource.min');
require('angular-route/angular-route.min');


var userApp = angular.module('userApp', ['ngRoute', 'ngResource', 'pusher-angular'])
    .factory('UserService', ['$resource', function($resource) {
        return $resource(window.userServiceUrl+'/users/:id', {id:'@id'}, {
            update: {method: 'PUT'}
        });
    }])
    .factory('LoggedInService', [function() {
        var isLoggedIn = false;
        return {
            isLoggedIn: function() {
                return isLoggedIn;
            },
            login: function() {
                console.log("login caled");
                isLoggedIn = true;
            },
            logout: function() {
                isLoggedIn = false;
            }
        }
    }])

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
    .controller('LoginController', ['$http', 'LoggedInService', function($http, LoggedInService) {
        var self = this;

        self.login = function() {
            console.log(self.user);
            $http.post(window.userServiceUrl+'/authenticate', self.user).then(function(response) {
               window.sessionStorage.token = response.data.token;
               LoggedInService.login();

            }, function(errorResponse) {
                console.log(errorResponse.data);
            });
        };
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
    }]);
require('pusher-angular');
require('./my-pusher');
