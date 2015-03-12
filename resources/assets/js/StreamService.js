angular.module('messageApp.StreamService', ['AppConfig'])
    .service('StreamService', ['AppConfig', '$pusher','localStorageService', '$http', function(AppConfig, $pusher,localStorage, $http) {
        var self = this;

        var pusherMessages = [];
        var contentMessages = [];
        var currentChannel = "";
        var client = new Pusher(AppConfig.pusherAppKey, {
            auth: {
                headers: {
                    'Authorization': 'Bearer '+ localStorage.get('token')
                }
            },
            authEndpoint: AppConfig.userServiceUrl + '/authenticate/pusher'
        });
        var pusher = $pusher(client);

        self.switchChannel = function(channelName) {

            if (currentChannel !== channelName) {

                if (channelName !== 'public_channel') {
                    channelName = 'private-' + channelName;
                }

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
                        var ext = message.image_id.split('.');
                        message.ext = ext[ext.length - 1];
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
