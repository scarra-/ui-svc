API_KEY = '7b0cc00ab6716c7191b4';

angular.module('userApp').controller('PusherController', ['$scope', '$pusher', function ($scope, $pusher) {
    var client = new Pusher(API_KEY);
    var pusher = $pusher(client);
    var my_channel = pusher.subscribe('public_channel');
    /**
     * '$scope.tweets' variable should receive history of last 20 tweets when user enters login page.
     * then while he is entering login information, tweet array will be updated with new tweets
     */
    $scope.tweets = [{name: "Karlis", message: "hello waweqwerqworld19", time: "Monday 2nd of March 2015 07:21:53 PM"},
        {name: "Kedwearlis", message: "hello wawwedweworld19", time: "Mwedwedd of March 2015 07:21:53 PM"},
        {name: "Kssdddarlis", message: "dddddhello waweqwerqworld19", time: "Morch 2015 07:21:53 PM"}];
    my_channel.bind('new_tweet', function (data) {
            $scope.tweets.unshift(data);
            //console.log(data);
        }
    );
}]);