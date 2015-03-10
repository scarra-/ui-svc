angular.module('messageApp.RegisterController', [])
    .controller('RegisterController', ['UserService', function(UserService) {
        var self = this;

        self.buttonText = 'Register';
        self.disabled   = false;

        // $http.get(url)
        //     .success(successCallback)
        //     .error(errorCallback);

        self.registerUser = function() {
            self.disabled   = true;
            self.buttonText = 'Loading...';
            var user = new UserService(self.user);

            user.$save(function(success) {
                //console.log(success);
                self.user = {};
                self.userRegistered = true;
                self.mailError = false;
                self.userError = false;
                self.internalError = false;

                self.buttonText = 'Register';
                self.disabled   = false;
            }, function(failure) {
                console.log(failure);
                //console.log(failure.status);
                if(failure.status=='0'){
                    self.buttonText = 'Register';
                    self.disabled   = false;
                    self.internalError = true;
                }
                else{
                    self.internalError = false;
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
                }

                self.buttonText = 'Register';
                self.disabled = false;
            });
        };
    }]);
