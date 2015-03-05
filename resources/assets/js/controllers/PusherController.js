angular.module('messageApp.PusherController', [ 'AppConfig'])
    .controller('PusherController', ['AppConfig', 'MessageStreamService', '$pusher', function (AppConfig, MessageStreamService, $pusher) {
        var self = this;

        self.tweets = MessageStreamService.getMessages;

        var client     = new Pusher(AppConfig.pusherAppKey);
        var pusher     = $pusher(client);
        var my_channel = pusher.subscribe('public_channel');

        MessageStreamService.addMessage({name: "Karlis", message: "hello! my name is Karlis", time: "Monday 2nd of March 2015 07:21:53 PM"});

        my_channel.bind('newTweet', function (data) {
                // self.tweets.unshift(data);
                MessageStreamService.addMessage(data);
                console.log(data);

            }
        );
    }]);
