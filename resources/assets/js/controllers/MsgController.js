angular.module('messageApp.MsgController', ['AppConfig'])
    .controller('MsgController', ['$http', 'AppConfig','localStorageService', function($http, AppConfig, localStorage) {
        var self = this;

        self.sendMessage = function() {
            console.log("calling method");

            var authHeader = { 'Authorization': 'Bearer '+localStorage.get('token') };

            $http.post(AppConfig.contentServiceUrl+'/messages', self.msg, {headers: authHeader}).then(function() {
                self.msg = {};

                console.log("message sent");

            }, function(errorResponse) {

            });
        };
    }]);
