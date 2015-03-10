angular.module('messageApp.RequestResetController', ['AppConfig' ])
    .controller('RequestResetController', ['$http','AppConfig', '$location', function($http, AppConfig, $location) {
        var self = this;

        self.buttonText = 'Request Password Reset';
        self.disabled = false;

        self.requestReset = function() {

            // self.buttonText = 'Loading...';
            // self.disabled = true;

            $http.post(AppConfig.userServiceUrl+'/resets', self.reset).then(function(response) {
                $location.path( "/#/" );
                console.log("password reset success");

            }, function(errorResponse) {
                //console.log(errorResponse);
                if(errorResponse.status=='0'){
                    self.buttonText = 'Request Password Reset';
                    self.disabled   = false;
                }
                console.log("password reset failed");
            });
            self.buttonText = 'Loading...';
            self.disabled = true;
        };

    }]);
