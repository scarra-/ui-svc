angular.module('messageApp.ResetPasswordController', ['AppConfig' ])
    .controller('ResetPasswordController', [
        '$http',
        'AppConfig',
        '$location',
        '$routeParams',
        function($http, AppConfig, $location, $routeParams) {

            var self = this;
            self.passwordReset = {"token":$location.search().token};

            self.resetPassword = function() {

                console.log(self.passwordReset);
                console.log($location.search().token);

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
