require('angular/angular.min');
require('angular-resource/angular-resource.min');
// require('angular-route/angular-route.min');
require('pusher-angular');
require('angular-local-storage');
require('./partials');

var AuthService   = require('./auth-service');
var StreamService = require('./stream-service');

function url_base64_decode(str) {
  var output = str.replace('-', '+').replace('_', '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw 'Illegal base64url string!';
  }
  return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
}


var AppConfig = angular.module('AppConfig', [])
    .provider('AppConfig', function () {
    var config = {
        userServiceUrl: 'http://api.acn-bootcamp.com',
        contentServiceUrl: 'http://api.acn-bootcamp.com',
    };

    return {
        set: function (settings) {
            config = settings;
        },
        $get: function () {
            return config;
        }
    };
});

var messageApp = angular.module('messageApp', [/*'ngRoute',*/ 'ngResource', 'pusher-angular', 'LocalStorageModule', 'AppConfig', 'partialsModule'])
    .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('bootcamp')
            .setNotify(true, true);
    }])

    .factory('UserService', ['$resource', 'AppConfig', function($resource, AppConfig) {
        return $resource(AppConfig.userServiceUrl + '/users/:id', {id:'@id'}, {
            update: {method: 'PUT'}
        });
    }])
    .service('LoggedInService', [AuthService])
    .service('MessageStreamService', [StreamService])

    .controller('MainController', ['LoggedInService', function(LoggedInService) {
        var self = this;
        self.auth = LoggedInService.isLoggedIn;
    }])

    .controller('RegisterController', ['UserService', function(UserService) {
        var self = this;

        self.registerUser = function() {
            var user = new UserService(self.user);
            user.$save(function(success) {
                self.user = {};
            }, function(failure) {
            });
        };
    }])
    .controller('LoginController', ['$http', 'AppConfig', 'LoggedInService', 'MessageStreamService', 'localStorageService', function($http, AppConfig, LoggedInService, MessageStreamService, storage) {
        var self = this;

        self.login = function() {
            $http.post(AppConfig.userServiceUrl+'/authenticate', self.user).then(function(response) {
               LoggedInService.login();

               MessageStreamService.clearMessages();

               storage.set('token', response.data.token);

               var encodedProfile = response.data.token.split('.')[1];
               storage.set('profile', JSON.parse(url_base64_decode(encodedProfile)));
            }, function(errorResponse) {
            });
        };
        self.logout = function() {
            storage.remove('token');
            LoggedInService.logout();

        }
    }])
    .controller('MsgController', ['$http', 'AppConfig', function($http, AppConfig) {
        var self = this;

        self.sendMessage = function() {
            $http.post(AppConfig.contentServiceUrl+'/messages', self.msg).then(function() {
                self.msg = {};
            }, function(errorResponse) {
            });
        };
    }])
    .controller('PusherController', ['AppConfig', 'MessageStreamService', '$pusher', function (AppConfig, MessageStreamService, $pusher) {
        var self = this;

        self.tweets = MessageStreamService.getMessages;

        var client     = new Pusher(AppConfig.pusherAppKey);
        var pusher     = $pusher(client);
        var my_channel = pusher.subscribe('public_channel');

        MessageStreamService.addMessage({name: "Karlis", message: "hello! my name is Karlis", time: "Monday 2nd of March 2015 07:21:53 PM"});

        my_channel.bind('new_tweet', function (data) {
                // self.tweets.unshift(data);
            }
        );
    }]);
