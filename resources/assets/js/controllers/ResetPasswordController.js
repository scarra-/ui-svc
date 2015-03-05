angular.module('messageApp.ResetPasswordController', ['AppConfig' ])
    .controller('ResetPasswordController', [
        '$http',
        'AppConfig',
        '$location',
        '$routeParams',
        function($http, AppConfig, $location, $routeParams) {

            var self = this;

            self.resetPassword = function() {

                console.log(self.passwordReset);
                console.log($routeParams)

                if (self.passwordReset.password1 === self.passwordReset.password2) {
                    // send the new password and token

                    $http.post(AppConfig.userServiceUrl + '/reset', self.passwordReset).then(function(response) {

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
