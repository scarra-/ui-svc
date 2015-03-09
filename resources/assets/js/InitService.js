angular.module('messageApp.InitService', ['messageApp.AuthService'] )
    .provider('InitService', function() {
        console.log("init service called from service");

        // This function gets our dependencies, not the
        // provider above
        this.$get = ['AuthService', function(AuthService) {
            console.log(AuthService);
            AuthService.authenticate();

        }];
    });
