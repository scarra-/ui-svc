angular.module('messageApp.RequestResetController', ['AppConfig' ])
    .controller('RequestResetController', ['$http','AppConfig', '$location', function($http, AppConfig, $location) {
        var self = this;

        self.buttonText = 'Request Password Reset';
        self.disabled = false;

        self.requestReset = function() {

            self.emailError = false;

            $http.post(AppConfig.userServiceUrl+'/resets', self.reset).then(function(response) {
                console.log("password reset success");

            }, function(errorResponse) {
                //console.log(errorResponse);
                if(errorResponse.status=='0'){
                    self.buttonText = 'Request Password Reset';
                    self.disabled   = false;
                }
                else{
                    if (typeof errorResponse.data.error != 'undefined') {
                        self.emailError = true;
                    }
                    // console.log(errorResponse.data);
                }

            });
            self.buttonText = 'Loading...';
            self.disabled = true;
        };

    }]);
