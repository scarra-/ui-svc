API_KEY = '7b0cc00ab6716c7191b4';

angular.module('userApp').controller('PusherController', ['$scope', '$pusher', function ($scope, $pusher) {
    var client = new Pusher(API_KEY);
    var pusher = $pusher(client);
    var my_channel = pusher.subscribe('public_channel');
    /**
     * '$scope.tweets' variable should receive history of last 20 tweets when user enters login page.
     * then while he is entering login information, tweet array will be updated with new tweets
     */
    $scope.tweets = [{name: "Karlis", message: "hello! my name is Karlis", time: "Monday 2nd of March 2015 07:21:53 PM"},
        {name: "Anete", message: "Hi! You can call me Anete", time: "Monday 2nd of March 2015 07:22:53 PM"},
        {name: "Eriks", message: "And I am Eriks", time: "Monday 2nd of March 2015 07:23:53 PM"}];
    my_channel.bind('new_tweet', function (data) {
            $scope.tweets.unshift(data);
            //console.log(data);
        }
    );
}]);