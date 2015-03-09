angular.module('messageApp.DropzoneController',[])
    .controller('DropzoneController', [function () {
      var self = this;
      self.dropzoneConfig = {
        'options': { // passed into the Dropzone constructor
          'url': 'upload.php'
        },
        'eventHandlers': {
          'sending': function (file, xhr, formData) {
          },
          'success': function (file, response) {
          }
        }
      };
  }]);
