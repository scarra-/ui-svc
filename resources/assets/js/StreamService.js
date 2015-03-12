angular.module('messageApp.StreamService', ['AppConfig'])
    .service('StreamService', ['AppConfig', '$pusher','localStorageService', '$http', function(AppConfig, $pusher,localStorage, $http) {
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

        var lastMessageId = false;
        var messagesLoading = false;
        var contentPage = AppConfig.contentServiceUrl + '/messages';
        var parse = require('parse-link-header');
        var config = {
            headers: {'Authorization': 'Bearer '+ localStorage.get('token')},
            // params: {}
            // // params: {"id" : "<=" + lastMessageId }
        };


        self.myPagingFunction = function() {
            if (contentPage !== false && messagesLoading === false) {
                messagesLoading = true;
                $http.get(contentPage, config).then(function(success) {
                    var pagination = parse(success.headers('link'));

                    if (success.data.length - 1 >= 0 && lastMessageId === false) {
                        lastMessageId = success.data[0].id;
                    }

                    if (pagination.next) {
                        contentPage = pagination.next.url;
                        contentPage += "&id=<=" + lastMessageId;
                    } else {
                        contentPage = false;
                    }
                    angular.forEach(success.data, function(message) {
                        self.addContentMessage(message);
                    });
                    messagesLoading = false;
                }, function (failure) {
                    messagesLoading = false;
                });
            }
        };

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
            contentMessages.push(message);
        };

        self.clearContentMessages = function() {
            contentMessages = [];
            contentPage = AppConfig.contentServiceUrl + '/messages';
        };

    }]);
