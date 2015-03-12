angular.module('messageApp.PusherController', ['AppConfig'])
    .controller('PusherController', [
        'StreamService',
        'AppConfig',
        '$pusher',
        '$http',
        'AuthService',
        function (StreamService, AppConfig, $pusher, $http, AuthService) {

            var self = this;

            self.pusherMessages = StreamService.getPusherMessages;
            self.contentMessages = StreamService.getContentMessages;
            self.myPagingFunction = StreamService.myPagingFunction;

    }]);
