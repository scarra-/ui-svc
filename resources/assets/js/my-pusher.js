API_KEY = '7b0cc00ab6716c7191b4';

var pusherApp = angular.module('userApp');

pusherApp.controller('PusherController', ['$scope', '$pusher', function ($scope, $pusher) {
    var self = this;
    var client = new Pusher(API_KEY);
    var pusher = $pusher(client);
    var my_channel = pusher.subscribe('test_channel');
    var appended = '';
    var tweets = [{name: "Karlis", message: "hello waweqwerqworld19", time: "Monday 2nd of March 2015 07:21:53 PM"},
        {name: "Kedwearlis", message: "hello wawwedweworld19", time: "Mwedwedd of March 2015 07:21:53 PM"},
        {name: "Kssdddarlis", message: "dddddhello waweqwerqworld19", time: "Morch 2015 07:21:53 PM"}];
    $scope.tweets = tweets;
    my_channel.bind('my_event', function (data) {
            $scope.tweets.push(data);
            //console.log(data);
        }
    );
}]);