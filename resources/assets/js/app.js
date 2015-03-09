require('angular/angular.min');
require('angular-resource/angular-resource.min');
require('angular-route/angular-route.min');
require('ng-infinite-scroll');
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
require('./StreamService');
require('./InitService');
require('./controllers/DropzoneController');

var Dropzone = require("dropzone");

require('./controllers/UserModalController');


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
        'infinite-scroll',
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
        'messageApp.ConfirmRegistrationController',
        'messageApp.StreamService',
        'messageApp.InitService',
        'messageApp.DropzoneController',
        'messageApp.UserModalController'

    ])
    .config(['localStorageServiceProvider' , function (localStorageServiceProvider) {

        localStorageServiceProvider
            .setPrefix('bootcamp')
            .setNotify(true, true);
    }])
    .factory('UserService', ['$resource', 'AppConfig', function($resource, AppConfig) {
        return $resource(AppConfig.userServiceUrl + '/users/:id', {id:'@id'}, {
            update: {method: 'PUT'}
        });
    }])
    .factory('SubscriptionService', ['$resource', 'AppConfig', function($resource, AppConfig) {
        return $resource(AppConfig.subscriptionServiceUrl + '/subscriptions/:id', {id:'@id'}, {
            update: {method: 'PUT'}
        });
    }])
    .config([ '$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'main.html'
            })
            .when('/reset', {
                templateUrl: 'resetPassword.html',
            })
            .when('/forgotPassword', {
                templateUrl: 'requestReset.html'
            })
            .when('/confirm', {
                templateUrl: 'confirmRegistration.html'
            })
            .when('/:username', {
                templateUrl: 'main.html'
            })
            .otherwise({ redirectTo: '/' });
    }])
    .directive('dropzone', function () {
      return function (scope, element, attrs) {
        var dropzone;
        var split = attrs.dropzone.split('.');
        var config = scope[split[0]][split[1]];

        // create a Dropzone for the element with the given options
        dropzone = new Dropzone(element[0], config.options);

        // bind the given event handlers
        angular.forEach(config.eventHandlers, function (handler, event) {
          dropzone.on(event, handler);
        });
      };
    });
