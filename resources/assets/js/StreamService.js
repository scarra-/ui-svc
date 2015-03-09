angular.module('messageApp.StreamService', ['AppConfig'])
    .service('StreamService', [ 'AppConfig', '$pusher', function(AppConfig, $pusher) {
        var self = this;

        messages = [];
        var client        = new Pusher(AppConfig.pusherAppKey);
        var pusher        = $pusher(client);
        var currentChannel = "";

        // just a test message
        // self.addMessage({name: "Karlis", message: "hello! my name is Karlis", time: "Monday 2nd of March 2015 07:21:53 PM"});

        self.switchChannel = function(channelName) {
            console.log("called switching channel");

            console.log("current channel is " + currentChannel);
            if (currentChannel !== channelName) {

                if (pusher.connection.state === "connected") {
                    console.log("disconnecting from pusher");
                    pusher.disconnect();
                }

                console.log("switching channel to " + channelName);

                self.clearMessages();
                currentChannel = channelName;
                my_channel = pusher.subscribe(channelName);

                my_channel.bind('message', function (data) {
                    self.addMessage(data);
                    console.log("loaded message");
                });
            }
        }

        self.disconnectFromChannel = function() {
            pusher.disconnect();
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
