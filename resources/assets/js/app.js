var $ = require('jquery');
window.jQuery = $;
window.$ = $;


require('angular/angular.min');
require('angular-resource/angular-resource.min');
require('angular-route/angular-route.min');
require('ng-infinite-scroll');
require('pusher-angular');
require('angular-local-storage');
require('bootstrap/dist/js/bootstrap.js');

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
        'messageApp.InitService'
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
    .controller('UserModalController', ['$routeParams', 'AuthService', function($routeParams, AuthService) {
        var self = this;

        self.auth     = AuthService.isLoggedIn;
        self.userName = $routeParams.username;
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
    }]);
