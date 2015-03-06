require('angular/angular.min');
require('angular-resource/angular-resource.min');
require('angular-route/angular-route.min');
require('pusher-angular');
require('angular-local-storage');
require('./partials');
require('./controllers/LoginController');
require('./controllers/RegisterController');
require('./controllers/PusherController');
require('./controllers/MsgController');
require('./controllers/MainController');
require('./controllers/RequestResetController');
require('./controllers/ProfileController');
require('./AuthService');
require('./controllers/ResetPasswordController');
require('./controllers/ConfirmRegistrationController');

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
        'ngRoute',
        'ngResource',
        'pusher-angular',
        'LocalStorageModule',
        'AppConfig',
        'partialsModule',
        'messageApp.LoginController',
        'messageApp.RegisterController',
        'messageApp.MainController',
        'messageApp.MsgController',
        'messageApp.PusherController',
        'messageApp.RequestResetController',
        'messageApp.ProfileController',
        'messageApp.AuthService',
        'messageApp.ResetPasswordController',
        'messageApp.ConfirmRegistrationController'
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
    .service('MessageStreamService', [StreamService])
    .config([ '$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'main.html'
            })
            .when('/resetPassword', {
                templateUrl: 'resetPassword.html',
            })
            .when('/forgotPassword', {
                templateUrl: 'requestReset.html'
            })
            .when('/confirm', {
                templateUrl: 'confirmRegistration.html'
            })
            .otherwise({ redirectTo: '/' });
    }]);
