angular.module('messageApp.ResetPasswordController', ['AppConfig' ])
    .controller('ResetPasswordController', [
        '$http',
        'AppConfig',
        '$location',
        function($http, AppConfig, $location) {

            var self = this;
            self.passwordReset = {"token" : $location.search().token};

            self.resetPassword = function() {

                console.log(self.passwordReset);
                console.log($location.search().token);

                if (self.passwordReset.password === self.passwordReset.password2) {
                    // send the new password and token
                    delete self.passwordReset.password2;

                    $http.post(AppConfig.userServiceUrl + '/reset', self.passwordReset).then(function(response) {

                        $location.path( "/#/" );
                        console.log("password reset sent");

                    }, function(errorResponse) {
                        // add some error message in HTML
                        console.log(errorResponse);
                        console.log("password reset failed");
                    });
                }
                else {
                    console.log("passwords must match");
                }
            };

    }]);
