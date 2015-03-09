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


    //     self.myPagingFunction = function() {
    //     var req = {
    //     method: 'POST',
    //     url: 'http://example.com',
    //     headers: {'Access-Control-Allow-Origin': true}
    //     }
    //
    //     $http(req).then(function(success) {
    //         angular.forEach(success.data, function(message) {
    //             console.log(message);
    //             console.log("log");
    //             self.messages.push(message);
    //         });
    //     }, function (failure) {
    //         //
    //     });
    // }]);

        // self.myPagingFunction = function() {
        //
        // $http({
        //     url : 'http://content.acn-bootcamp.com/messages',
        //     method : "GET"
        // }).then(function(response){
        //     var data=response.data;
        //     console.log("data");
        // });
        //
        // }]);

    // self.myPagingFunction = function() {
    //
    //     $.ajax({
    //         url: '/sample.json',
    //         type: 'GET',
    //         crossDomain: true, // enable this
    //         dataType: 'jsonp',
    //         success: function() { console.log("Success"); },
    //         error: function() { console.log('Failed!'); },
    //         beforeSend: setHeader
    //     });
    // }]);
