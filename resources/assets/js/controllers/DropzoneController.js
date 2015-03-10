angular.module('messageApp.DropzoneController',[])
    .controller('DropzoneController', [function () {

      var self = this;

      self.dropzoneConfig = {
        'options': { // passed into the Dropzone constructor
          'url': 'upload.php',
          'autoProcessQueue': false
        },
        'eventHandlers': {
          'sending': function (file, xhr, formData) {
             console.log("sending the file");
             // can add token if needed to xhr
          },
          'success': function (file, response) {
              console.log("successful upload");
              console.log(response);

          }
        }
      };
  }]);
