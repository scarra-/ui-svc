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

            self.showError = function() {
                return self.loginError;
            }

            // used for setting user from LoginController
            self.setUser = function(user) {
                self.user = user;
            };

            self.isLoggedIn = function() {
                if (window.localStorage.getItem('bootcamp.token') !== null) {
                    isLoggedIn = true;
                }
                return isLoggedIn;
            };

            self.login = function(userObject) {
                $http.post(AppConfig.userServiceUrl+'/authenticate', userObject).then(function(response) {
                    StreamService.clearMessages();
                    storage.set('token', response.data.token);
                    var encodedProfile = response.data.token.split('.')[1];

                    storage.set('profile', JSON.parse(url_base64_decode(encodedProfile)).user);
                    self.setUser(userObject);

                    isLoggedIn = true;
                }, function(errorResponse) {
                    // need some action if fails
                    console.log("finished");
                    self.loginError = true;
                });
            };

            self.logout = function() {
                storage.remove('token');
                isLoggedIn = false;
            };
        }]);
