angular.module('messageApp.MsgController', ['AppConfig'])
    .controller('MsgController', ['$http', 'AppConfig', function($http, AppConfig) {
        var self = this;

        self.sendMessage = function() {
            console.log("calling method");
            $http.post(AppConfig.contentServiceUrl+'/messages', self.msg).then(function() {
                self.msg = {};
                console.log("message sent");


            }, function(errorResponse) {

            });
        };
    }]);
