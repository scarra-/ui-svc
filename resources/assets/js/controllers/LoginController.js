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

angular.module('messageApp.LoginController', [ 'LocalStorageModule', 'AppConfig'])
    .controller('LoginController', ['$http', 'AppConfig', 'LoggedInService', 'MessageStreamService', 'localStorageService', function($http, AppConfig, LoggedInService, MessageStreamService, storage) {
        var self = this;

        self.login = function() {
            $http.post(AppConfig.userServiceUrl+'/authenticate', self.user).then(function(response) {
               LoggedInService.login();

               MessageStreamService.clearMessages();

               storage.set('token', response.data.token);

               var encodedProfile = response.data.token.split('.')[1];
               storage.set('profile', JSON.parse(url_base64_decode(encodedProfile)));
            }, function(errorResponse) {
            });
        };
        self.logout = function() {
            storage.remove('token');
            LoggedInService.logout();

        }
    }]);
