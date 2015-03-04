require('angular/angular.min');
require('angular-resource/angular-resource.min');
// require('angular-route/angular-route.min');
require('pusher-angular');
require('angular-local-storage');
require('./partials');
require('./controllers/LoginController');
require('./controllers/RegisterController');
require('./controllers/PusherController');
require('./controllers/MsgController');
require('./controllers/MainController');

var AuthService   = require('./auth-service');
var StreamService = require('./stream-service');


var AppConfig = angular.module('AppConfig', [])
    .provider('AppConfig', function () {
    var config = {};

    return {
        set: function (settings) {
            config = settings;
        },
        $get: function () {
            return config;
        }
    };
});

var messageApp = angular.module('messageApp', [
                                                /*'ngRoute',*/
                                                'ngResource',
                                                'pusher-angular',
                                                'LocalStorageModule',
                                                'AppConfig',
                                                'partialsModule',
                                                'messageApp.LoginController',
                                                'messageApp.RegisterController',
                                                'messageApp.MainController',
                                                'messageApp.MsgController',
                                                'messageApp.PusherController'
                                                ])
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
    .service('MessageStreamService', [StreamService]);
