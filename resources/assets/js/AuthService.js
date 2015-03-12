function url_base64_decode(str) {
  var output = str.replace('-', '+').replace('_', '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw 'Illegal base64url string!';
  }
  return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
}

angular.module('messageApp.AuthService', ['LocalStorageModule', 'AppConfig'] )
    .service('AuthService', [
        '$http',
        'AppConfig',
        'StreamService',
        'localStorageService',
        function($http, AppConfig, StreamService, storage) {
            var self = this;
            var isLoggedIn = false;

            self.user = {};
            self.buttonText = 'Login';

            self.showError = function() {
                return self.loginError;
            };

            self.showButtonName = function(){
                return self.buttonText;
            };

            self.changeButtonState = function() {
                return self.disabled;
            };

            self.internalError = function(){
                return self.internalError;
            }

            // used for setting user from LoginController
            self.setUser = function(user) {
                self.user = user;
            };

            self.isLoggedIn = function() {
                return isLoggedIn;
            };

            self.authenticate = function() {

                if (window.localStorage.getItem('bootcamp.token') !== null) {

                    var profile = storage.get('profile');
                    self.setUser(profile);
                    StreamService.clearPusherMessages();
                    StreamService.switchChannel(profile.login);
                    isLoggedIn = true;
                }
                else {
                    StreamService.switchChannel("public_channel");
                }
            };

            self.login = function(userObject) {

                self.disabled   = true;
                self.buttonText = 'Loading...';
                self.internalError = false;

                $http.post(AppConfig.userServiceUrl+'/authenticate', userObject).then(function(response) {
                    storage.set('token', response.data.token);
                    StreamService.switchChannel(userObject.login);
                    StreamService.clearContentMessages();

                    var encodedProfile = response.data.token.split('.')[1];

                    storage.set('profile', JSON.parse(url_base64_decode(encodedProfile)).user);
                    self.setUser(userObject);

                    StreamService.myPagingFunction();
                    isLoggedIn = true;
                    self.loginError = false;
                    self.disabled   = false;
                    self.buttonText = 'Login';

                }, function(errorResponse) {
                    // need some action if fails
                    if (errorResponse.status=='0') {
                        self.buttonText = 'Login';
                        self.disabled   = false;
                        self.internalError = true;
                    }
                    else {
                        console.log("login failed");
                        self.internalError = false;
                        self.loginError = true;
                        self.disabled   = false;
                        self.buttonText = 'Login';
                    }
                });
            };

            self.logout = function() {
                storage.remove('token');
                storage.remove('profile');
                console.log("logging out");
                StreamService.clearContentMessages();
                StreamService.myPagingFunction();

                StreamService.switchChannel("public_channel");
                // maybe need to disconnect from pusher channel
                isLoggedIn = false;
            };

        }]);
