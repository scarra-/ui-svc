angular.module('messageApp.MsgController', ['AppConfig'])
    .controller('MsgController', ['$http', 'AppConfig','localStorageService', '$upload', function($http, AppConfig, localStorage, $upload) {
        var self = this;

        var authHeader = { 'Authorization': 'Bearer ' + localStorage.get('token') };

        self.submit = function() {
            if (self.msg.image) {
                console.log(self.msg.image);
                $upload.upload({
                    url: 'upload/url',
                    headers: authHeader,
                    file: self.msg.image
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
            $http.post(AppConfig.contentServiceUrl+'/messages', self.msg, {headers: authHeader}).then(function() {
                self.msg = {};
            }, function(errorResponse) {
            });
        };
    }]);
