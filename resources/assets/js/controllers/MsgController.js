angular.module('messageApp.MsgController', ['AppConfig'])
    .controller('MsgController', ['$http', 'AppConfig', function($http, AppConfig) {
        var self = this;

        self.sendMessage = function() {
            $http.post(AppConfig.contentServiceUrl+'/messages', self.msg).then(function() {
                self.msg = {};
            }, function(errorResponse) {
            });
        };
    }]);
