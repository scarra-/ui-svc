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

        var lastMessageId = 0;

        self.myPagingFunction = function() {
            self.messagesLoading = false;
            var contentPage = AppConfig.contentServiceUrl + '/messages';
            var parse = require('parse-link-header');

            var config = {headers:  {
                'Authorization': 'Bearer '+ localStorage.get('token'),
                'lastMessageId': lastMessageId
                }
            };

            if (contentPage !== false && self.messagesLoading === false) {
                self.messagesLoading = true;
                $http.get(contentPage, config).then(function(success) {
                    var pagination = parse(success.headers('link'));
                    lastMessageId = success.data[success.data.length - 1].id;

                    if (pagination.next) {
                        contentPage = pagination.next.url;
                    } else {
                        contentPage = false;
                    }

                    angular.forEach(success.data, function(message) {
                        self.addContentMessage(message);
                    });
                    self.messagesLoading = false;
                }, function (failure) {
                    self.messagesLoading = false;
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
            contentMessages.unshift(message);
        };

        self.clearContentMessages = function() {
            contentMessages = [];
        };

    }]);
