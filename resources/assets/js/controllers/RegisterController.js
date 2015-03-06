angular.module('messageApp.RegisterController', [])
    .controller('RegisterController', ['UserService', function(UserService) {
        var self = this;

        self.buttonText = 'Register';

        self.registerUser = function() {
            self.buttonText = 'Loading...';
            var user = new UserService(self.user);

            user.$save(function(success) {
                self.user = {};
                self.userRegistered = true;
                self.mailError = false;
                self.userError = false;

                self.buttonText = 'Register';
            }, function(failure) {
                if (typeof failure.data.email != 'undefined') {
                    self.mailError = true;
                }
                else {
                    self.mailError = false;
                }
                if (typeof failure.data.login != 'undefined') {
                    self.userError = true;
                }
                else {
                    self.userError = false;
                }

                self.buttonText = 'Register';
            });
        };
    }]);
