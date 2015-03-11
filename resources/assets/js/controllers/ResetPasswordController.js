angular.module('messageApp.ResetPasswordController', ['AppConfig' ])
    .controller('ResetPasswordController', [
        '$http',
        'AppConfig',
        '$location',
        function($http, AppConfig, $location) {

            var self = this;

            self.passwordReset = {"token" : $location.search().token};
            self.buttonText = 'Reset Password';
            self.disabled   = false;

            self.resetPassword = function() {
                self.disabled   = true;
                self.buttonText = 'Loading...';

                console.log(self.passwordReset);
                console.log($location.search().token);

                if (self.passwordReset.password === self.passwordReset.password2) {
                    // send the new password and token
                    delete self.passwordReset.password2;

                    $http.post(AppConfig.userServiceUrl + '/reset', self.passwordReset).then(function(response) {
                        self.passwordResset = true;
                        console.log("password reset sent");

                    }, function(errorResponse) {
                        self.passwordResset = false;

                        if(errorResponse.status=='0'){
                            self.buttonText = 'Reset Password';
                            self.disabled   = false;
                        }
                        // add some error message in HTML
                        console.log(errorResponse);
                        console.log("password reset failed");
                        self.buttonText = 'Reset Password';
                        self.disabled   = false;
                    });
                }
                else {
                    console.log("passwords must match");
                    self.buttonText = 'Reset Password';
                    self.disabled   = false;
                }

            };

    }]);
