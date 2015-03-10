angular.module('messageApp.StreamService', ['AppConfig'])
    .service('StreamService', [ 'AppConfig', '$pusher', function(AppConfig, $pusher) {
        var self = this;

        var messages = [];
        var client        = new Pusher(AppConfig.pusherAppKey);
        var pusher        = $pusher(client);
        var currentChannel = "";


        self.switchChannel = function(channelName) {

            if (currentChannel !== channelName) {

                self.clearMessages();
                pusher.unsubscribe(currentChannel);

                my_channel = pusher.subscribe(channelName);
                currentChannel = channelName;

                my_channel.bind('message', function (data) {
                    self.addMessage(data);
                });
            }
        }


        self.getMessages = function() {
            return messages;
        };

        self.addMessage = function(message) {
            messages.unshift(message);
        };

        self.clearMessages = function() {
            messages = [];
        };

    }]);
