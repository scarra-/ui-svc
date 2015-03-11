angular.module('messageApp.PusherController', ['AppConfig'])
    .controller('PusherController', [
        'StreamService',
        'AppConfig',
        '$pusher',
        '$http',
        'localStorageService',
        function (StreamService, AppConfig, $pusher, $http, localStorage) {
            var self = this;

            self.pusherMessages = StreamService.getPusherMessages;
            self.contentMessages = StreamService.getContentMessages;
            var loading = false;

            self.page = AppConfig.contentServiceUrl+'/messages';
            var parse = require('parse-link-header');
            var authHeader = { 'Authorization': 'Bearer '+ localStorage.get('token') };


            self.myPagingFunction = function() {
                if (self.page !== false && loading === false) {
                    loading = true;
                    $http.get(self.page, {headers: authHeader}).then(function(success) {
                        var pagination = parse(success.headers('link'));

                        if (pagination.next) {
                            self.page = pagination.next.url;
                        } else {
                            self.page = false;
                        }

                        angular.forEach(success.data, function(message) {
                            StreamService.addContentMessage(message);
                        });
                        loading = false;
                    }, function (failure) {
                        loading = false;
                    });
                }
            };
    }]);
