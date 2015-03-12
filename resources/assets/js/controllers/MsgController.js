angular.module('messageApp.MsgController', ['AppConfig'])
    .controller('MsgController', ['$http', 'AppConfig','localStorageService', '$upload', function($http, AppConfig, localStorage, $upload) {
        var self = this;
        self.img = {};
        self.buttonText = 'Send message';
        self.disabled   = false;
        self.hideinput = true;
        self.hideImageName = false;

        var authHeader = { 'Authorization': 'Bearer ' + localStorage.get('token') };

        self.showProgress = function(){

            return self.progress;

        }


        self.submit = function() {
            self.internalError = false;
            self.disabled   = true;
            self.buttonText = 'Loading...';
            self.hideinput = false;

            if (self.img.image) {
                console.log(self.img.image);
                $upload.upload({
                    url: AppConfig.contentServiceUrl + '/upload',
                    headers: authHeader,
                    file: self.img.image
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    self.progress = progressPercentage;
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file[0].name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                    self.msg.image_id = data.image_id;
                    self.sendMessage();
                        self.buttonText = 'Send message';
                        self.disabled   = false;
                    if(self.progress == 100){
                        self.hideinput = true;
                        self.hideImageName = true;
                    }
                }).error(function (data, status, headers, config) {
                    // if(status=='0'){
                    //     self.buttonText = 'Send message';
                    //     self.disabled   = false;
                    //     self.internalError = true;
                    // }
                    // else{
                        self.buttonText = 'Send message';
                        self.disabled   = false;
                        self.hideinput = false;
                        self.hideImageName = false;
                        console.log('Failed to upload image: ' + config.file[0].name);
                    //}

                });
            } else {
                self.sendMessage();
                self.buttonText = 'Send message';
                self.disabled   = false;
                self.hideinput = true;
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
