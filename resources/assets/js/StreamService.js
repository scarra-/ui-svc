angular.module('messageApp.StreamService', ['AppConfig'])
    .service('StreamService', ['AppConfig', '$pusher', function(AppConfig, $pusher) {
        var self = this;

        var pusherMessages = [];
        var contentMessages = [];

        var client        = new Pusher(AppConfig.pusherAppKey);
        var pusher        = $pusher(client);
        var currentChannel = "";


        self.switchChannel = function(channelName) {

            if (currentChannel !== channelName) {

                self.clearPusherMessages();
                pusher.unsubscribe(currentChannel);

                my_channel = pusher.subscribe(channelName);
                currentChannel = channelName;

                my_channel.bind('message', function (data) {
                    self.addPusherMessage(data);
                });
            }
        }

        // functions for the messages from Pusher service
        self.getPusherMessages = function() {
            return pusherMessages;
        };

        self.addPusherMessage = function(message) {
            pusherMessages.unshift(message);
        };

        self.clearPusherMessages = function() {
            pusherMessages = [];
        };

        // functions for the messages from Content service
        self.getContentMessages = function() {
            return contentMessages;
        };

        self.addContentMessage = function(message) {
            contentMessages.unshift(message);
        };

        self.clearContentMessages = function() {
            contentMessages = [];
        };

    }]);
