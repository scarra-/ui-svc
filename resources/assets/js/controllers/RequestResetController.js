angular.module('messageApp.RequestResetController', ['AppConfig' ])
    .controller('RequestResetController', ['$http','AppConfig', '$location', function($http, AppConfig, $location) {
        var self = this;

        self.requestReset = function() {

            $location.path( "/#/" );
            $http.post(AppConfig.userServiceUrl+'/resets', self.reset).then(function(response) {

                console.log("password reset success");

            }, function(errorResponse) {
                console.log("password reset failed");
            });
        };

    }]);
