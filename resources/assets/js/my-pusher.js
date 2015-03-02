console.info('works');
/*var apended = '';
 var pusher = new Pusher('7b0cc00ab6716c7191b4');
 var channel = pusher.subscribe('test_channel');
 channel.bind('my_event', function (data) {
 apended = '<li class="activity test-event">'
 + '<div class="stream-item-content">'
 + '<div class="image">'
 + '<img src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=monsterid&amp;s=48" width="48" height="48">'
 + '</div>'
 + '<div class="content">'
 + '<div class="activity-row"><span class="user-name"><em>Karlis</em></span>'
 + '</div>'
 + '<div class="activity-row">'
 + '<div class="text">' + data.message + '</div>'
 + '<div class="activity-row"><a class="timestamp"><span title="'+data.time+'">'+data.time+'</span></a><span class="activity-actions"><span class="tweet-action action-favorite"><a href="#" class="like-action" data-activity="like" title="Like"><span><i></i><b>Like</b></span></a></span></span></div>'
 + '</div>'
 + '</div>'
 + '</div>'
 + '</li>';
 $('.activity-stream').prepend(apended);

 //});*/

API_KEY = '7b0cc00ab6716c7191b4';

var pusherApp = angular.module('userApp');

pusherApp.controller('PusherController', ['$scope', '$pusher', function ($scope, $pusher) {

    var client = new Pusher(API_KEY);
    var pusher = $pusher(client);
    var my_channel = pusher.subscribe('test_channel');
    var appended = '';
    var tweets = $scope.
    my_channel.bind('my_event', function (data) {
            tweets.push = data;
        }
    );
}]);

//angular.module('userApp');