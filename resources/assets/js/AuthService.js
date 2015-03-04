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
        'MessageStreamService',
        'localStorageService',
        function($http, AppConfig, MessageStreamService, storage) {
            var self = this;

            self.user = {};

            self.setUser = function(user) {
                self.user = user;
            };

            var isLoggedIn = false;

            self.isLoggedIn = function() {
                if (window.localStorage.getItem('bootcamp.token') !== null) {
                    isLoggedIn = true;
                }
                return isLoggedIn;
            };

            self.login = function(userObject) {
                $http.post(AppConfig.userServiceUrl+'/authenticate', userObject).then(function(response) {
                    MessageStreamService.clearMessages();
                    storage.set('token', response.data.token);
                    var encodedProfile = response.data.token.split('.')[1];

                    storage.set('profile', JSON.parse(url_base64_decode(encodedProfile)).user);
                    

                }, function(errorResponse) {

                });

                isLoggedIn = true;
            };

            self.logout = function() {
                storage.remove('token');
                isLoggedIn = false;
            };
        }]);
