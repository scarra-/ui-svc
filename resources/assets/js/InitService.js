angular.module('messageApp.InitService', ['messageApp.AuthService'] )
    .provider('InitService', function() {

        // This function gets our dependencies, not the
        // provider above
        this.$get = ['AuthService', function(AuthService) {
            AuthService.authenticate();

        }];
    });
