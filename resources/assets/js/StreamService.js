angular.module('messageApp.StreamService', ['AppConfig'])
    .service('StreamService', [ 'AppConfig', '$pusher', function(AppConfig, $pusher) {
        var self = this;

        messages = [];
        var client        = new Pusher(AppConfig.pusherAppKey);
        var pusher        = $pusher(client);
        var my_channel    = pusher.subscribe('public_channel');

        // my_channel.bind('message', function (data) {
        //
        //     self.addMessage(data);
        //     // sample = ({name: "Karlis", message: "hello! my name is Karlis", time: "Monday 2nd of March 2015 07:21:53 PM"});
        //     // self.addMessage(sample);
        //     console.log("loaded message");
        //
        // });

        // just a test message
        // self.addMessage({name: "Karlis", message: "hello! my name is Karlis", time: "Monday 2nd of March 2015 07:21:53 PM"});


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
