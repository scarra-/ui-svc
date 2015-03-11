angular.module('messageApp.RequestResetController', ['AppConfig' ])
    .controller('RequestResetController', ['$http','AppConfig', '$location', function($http, AppConfig, $location) {
        var self = this;

        self.buttonText = 'Request Password Reset';
        self.disabled = false;
        self.redirectButton = false;
        //
        // self.getButton = function() {
        //     return self.redirectButton;
        // }

        self.requestReset = function() {

            self.emailError = false;

            $http.post(AppConfig.userServiceUrl+'/resets', self.reset).then(function(response) {
                console.log("password reset success");

                self.buttonText = 'Request Password Reset';
                self.disabled   = false;
                self.passwordResset = true;

                // self.redirectButton = true;


            }, function(errorResponse) {
                //console.log(errorResponse);
                if(errorResponse.status=='0'){
                    self.buttonText = 'Request Password Reset';
                    self.disabled   = false;
                }
                else{
                    if (typeof errorResponse.data.error != 'undefined') {
                        self.emailError = true;
                        self.buttonText = 'Request Password Reset';
                        self.disabled = false;
                    }
                    // console.log(errorResponse.data);
                }
                self.passwordResset = false;
            });
            self.buttonText = 'Loading...';
            self.disabled = true;
        };

    }]);
