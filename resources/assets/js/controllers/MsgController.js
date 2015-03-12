angular.module('messageApp.MsgController', ['AppConfig'])
    .controller('MsgController', ['$http', 'AppConfig','localStorageService', '$upload', function($http, AppConfig, localStorage, $upload) {
        var self = this;
        self.img = {};
        self.buttonText = 'Send message';
        self.disabled   = false;

        var authHeader = { 'Authorization': 'Bearer ' + localStorage.get('token') };

        self.submit = function() {
            self.internalError = false;
            self.disabled   = true;
            self.buttonText = 'Loading...';

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
                    self.msg.image_id = data.image_id;
                    self.sendMessage();
                        self.buttonText = 'Send message';
                        self.disabled   = false;
                }).error(function (data, status, headers, config) {
                    // if(status=='0'){
                    //     self.buttonText = 'Send message';
                    //     self.disabled   = false;
                    //     self.internalError = true;
                    // }
                    // else{
                        self.buttonText = 'Send message';
                        self.disabled   = false;
                        console.log('Failed to upload image: ' + config.file[0].name);
                    //}

                });
            } else {
                self.sendMessage();
                self.buttonText = 'Send message';
                self.disabled   = false;
            }
            self.buttonText = 'Send message';
            self.disabled   = false;
        };

        self.sendMessage = function() {
            var authHeader = { 'Authorization': 'Bearer ' + localStorage.get('token') };
            $http.post(AppConfig.contentServiceUrl+'/messages', self.msg, {headers: authHeader}).then(function() {
                self.msg = {};
            }, function(errorResponse) {
                console.log("failed sending message");
                console.log(errorResponse);
            });
        };
    }]);
