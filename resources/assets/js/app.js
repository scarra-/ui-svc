require('angular/angular.min');
require('angular-resource/angular-resource.min');
require('angular-route/angular-route.min');

var userApp = angular.module('userApp', ['ngRoute', 'ngResource'])
    .factory('UserService', ['$resource', function($resource) {
        return $resource('/users/:id', {id:'@id'}, {
            update: {method: 'PUT'}
        });
    }])
    .controller('HomeController', [function() {
        var self = this;
        self.title = 'asdasd';
    }])
    .controller('RegisterController', ['UserService', function(UserService) {
        var self = this;

        self.registerUser = function() {
            var user = new UserService(self.user);
            user.$save(function(response) {
                console.log('User registered:', response);
            });
        };
    }])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
          templateUrl: 'partials/home.html'
        //   controller: 'HomeController'
        })
        .when('/register', {
          templateUrl: 'partials/register.html'
        //   controller: 'RegisterController'
        })
        .otherwise({redirectTo: '/'});
}]);
