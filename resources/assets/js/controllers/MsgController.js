angular.module('messageApp.MsgController', ['AppConfig'])
    .controller('MsgController', ['$http', 'AppConfig','localStorageService', '$upload', '$scope', function($http, AppConfig, localStorage, $upload, $scope) {
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

        var showDrag = false;
        var timeout = -1;

        $('html').on('dragenter', function() {
            $('.filedroparea').show();
            showDrag = true;
        });

        $('html').bind('dragover', function(){
            showDrag = true;
        });

        $('html').on('dragleave', function() {
            showDrag = false;
            clearTimeout( timeout );
            timeout = setTimeout( function(){
                if( !showDrag ){ $('.filedroparea').hide(); }
            }, 200 );
        });

        self.fileDropped = function(file) {
            $('.filedroparea').hide();
            console.log(file);
            if (file && file[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('.image-preview').attr('src', e.target.result);
                }

                reader.readAsDataURL(file[0]);
                $('.image-preview').show();
            }
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
