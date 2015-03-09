angular.module('messageApp.StreamService', ['AppConfig'])
    .service('StreamService', [ 'AppConfig', '$pusher', function(AppConfig, $pusher) {
        var self = this;

        var messages = [];
        var client        = new Pusher(AppConfig.pusherAppKey);
        var pusher        = $pusher(client);
        console.log("creating pusher ");
        var currentChannel = "";


        self.switchChannel = function(channelName) {
            console.log("called switching channel");

            console.log("current channel is " + currentChannel);

            if (currentChannel !== channelName) {
                console.log("switching channel to " + channelName);

                self.clearMessages();
                pusher.unsubscribe(currentChannel);

                my_channel = pusher.subscribe(channelName);
                currentChannel = channelName;

                my_channel.bind('message', function (data) {
                    self.addMessage(data);
                    console.log("loaded message");
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
