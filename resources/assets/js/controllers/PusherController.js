angular.module('messageApp.PusherController', [])
    .controller('PusherController', [ 'StreamService','$pusher', '$http', function (StreamService, $pusher, $http) {
        var self = this;

        self.tweets   = StreamService.getMessages;
        self.messages = [];

    //

    $http.get('http://content.acn-bootcamp.com/messages').then(function(success) {
        console.log(success);
        angular.forEach(success.data, function(message) {
            self.messages.push(message);

        });
    }, function (failure) {
                //
    });

    

}]);
