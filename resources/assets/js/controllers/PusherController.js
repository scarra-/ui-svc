angular.module('messageApp.PusherController', ['AppConfig'])
    .controller('PusherController', [ 'StreamService', 'AppConfig', '$pusher', '$http', function (StreamService, AppConfig, $pusher, $http) {
        var self = this;

        self.tweets   = StreamService.getMessages;
        
        self.messages = [];
        var loading = false;

        self.page = AppConfig.contentServiceUrl+'/messages';
        var parse = require('parse-link-header');

        self.myPagingFunction = function() {
            if (self.page !== false && loading === false) {
                loading = true;
                $http.get(self.page).then(function(success) {
                    var pagination = parse(success.headers('link'));

                    if (pagination.next) {
                        self.page = pagination.next.url;
                    } else {
                        self.page = false;
                    }

                    angular.forEach(success.data, function(message) {
                        self.messages.push(message);
                    });
                    loading = false;
                }, function (failure) {
                    loading = false;
                });
            }
        };
    }]);
