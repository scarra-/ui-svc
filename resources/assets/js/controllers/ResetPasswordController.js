angular.module('messageApp.ResetPasswordController', ['AppConfig' ])
    .controller('ResetPasswordController', ['$http','AppConfig', '$location', function($http, AppConfig, $location) {
        var self = this;

        self.resetPassword = function() {
            if (self.passwordReset.password1 === self.passwordReset.password2) {
                // send the new password and token
                $http.post(AppConfig.userServiceUrl+'/reset', self.reset).then(function(response) {

                    $location.path( "/#/" );
                    console.log("password reset sent");

                }, function(errorResponse) {

                    console.log("password reset failed sending");
                });

            }
            else {
                console.log("passwords must match");
            }
        };

    }]);
