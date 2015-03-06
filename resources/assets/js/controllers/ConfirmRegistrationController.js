angular.module('messageApp.ConfirmRegistrationController', ['AppConfig' ])
    .controller('ConfirmRegistrationController', [
        '$http',
        'AppConfig',
        '$location',
        function($http, AppConfig, $location) {

            var self = this;
            self.confirmObject = {"token" : $location.search().token};

            self.conirmRegistration = function() {

                $http.post(AppConfig.userServiceUrl + '/reset', self.confirmObject).then(function(response) {

                    $location.path( "/#/" );
                    console.log("confirmation sent");

                }, function(errorResponse) {
                    // add some error message in HTML
                    console.log("confirmation failed");
                });
            };
    }]);
