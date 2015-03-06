angular.module('messageApp.ConfirmRegistrationController', ['AppConfig' ])
    .controller('ConfirmRegistrationController', [
        '$http',
        'AppConfig',
        '$location',
        '$scope',
        function($http, AppConfig, $location, $scope) {

            var self = this;

            self.confirmObject = {"token" : $location.search().token};

            self.confirmRegistration = function() {
                console.log("test");

                $http.post(AppConfig.userServiceUrl + '/confirm', self.confirmObject).then(function(response) {

                    // $location.path( "/#/" );
                    console.log("confirmation sent");

                }, function(errorResponse) {
                    // add some error message in HTML
                    console.log("confirmation failed");
                });
            };
    }]);