angular.module('messageApp.PusherController', [])
    .controller('PusherController', [ 'StreamService','$pusher', '$http', function (StreamService, $pusher, $http) {
        var self = this;

        self.tweets   = StreamService.getMessages;
        self.messages = [];

        // NOT SURE IF IT SHOULD BE HERE
        // StreamService.switchChannel("public_channel");

        self.myPagingFunction = function() {
            $http.get('/sample.json').then(function(success) {
                angular.forEach(success.data, function(message) {
                  self.messages.push(message);
                });
            }, function (failure) {
                //
            });
        };
    }]);
