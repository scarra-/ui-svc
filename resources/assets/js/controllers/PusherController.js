angular.module('messageApp.PusherController', [])
    .controller('PusherController', [ 'StreamService','$pusher', function (StreamService, $pusher) {
            var self = this;

            self.tweets = StreamService.getMessages();

    }]);
