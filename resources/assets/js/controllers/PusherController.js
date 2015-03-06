angular.module('messageApp.PusherController', [ 'AppConfig'])
    .controller('PusherController', [
        'AppConfig',
        'MessageStreamService',
        '$pusher',
        '$http',
        function (AppConfig, MessageStreamService, $pusher, $http) {
            var self = this;

            self.messages = [];
            self.tweets = MessageStreamService.getMessages;

            self.myPagingFunction = function() {
                $http.get('/sample.json').then(function(success) {
                    angular.forEach(success.data, function(message) {
                      self.messages.push(message);
                    });
                }, function (failure) {

                });
                // self.messages.push(last + 1);
            };

            var client     = new Pusher(AppConfig.pusherAppKey);
            var pusher     = $pusher(client);
            var my_channel = pusher.subscribe('public_channel');

            my_channel.bind('newTweet', function (data) {
                // self.tweets.unshift(data);
                MessageStreamService.addMessage(data);
                console.log(data);

                }
            );
    }]);
