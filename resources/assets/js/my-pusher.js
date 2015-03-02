console.info('works');


API_KEY = '7b0cc00ab6716c7191b4';

var apended = '';
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

});