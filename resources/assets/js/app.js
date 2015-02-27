//require('angular/angular.min');
require('angular-resource/angular-resource.min');
require('angular-route/angular-route.min');
//require('./pusher.min');
//require('./pusher-angular.min');
require('pusher-angular');
require('./my-pusher');




if(typeof angular == 'undefined') {
    alert('no angular');
}


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
            user.$save(function(success) {

                self.user = {};
            }, function(failure) {
                console.log(failure);
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

    var validator = angular.module('userApp', [])
     .controller('Controller', ['$scope', function($scope) {
       $scope.user = {};
//d
     }]);