angular.module('messageApp.MsgController', ['AppConfig'])
    .controller('MsgController', ['$http', 'AppConfig','localStorageService', '$upload', function($http, AppConfig, localStorage, $upload) {
        var self = this;
        self.img = {};

        var authHeader = { 'Authorization': 'Bearer ' + localStorage.get('token') };

        self.submit = function() {
            if (self.img.image) {
                console.log(self.img.image);
                $upload.upload({
                    url: AppConfig.contentServiceUrl + '/upload',
                    headers: authHeader,
                    file: self.img.image
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file[0].name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                    self.sendMessage();
                }).error(function (data, status, headers, config) {
                    console.log('Failed to upload image: ' + config.file[0].name);
                });
            } else {
                self.sendMessage();
            }
        };

        self.sendMessage = function() {
            var authHeader = { 'Authorization': 'Bearer ' + localStorage.get('token') };
            $http.post(AppConfig.contentServiceUrl+'/messages', self.msg, {headers: authHeader}).then(function() {
                self.msg = {};
            }, function(errorResponse) {
            });
        };
    }]);
