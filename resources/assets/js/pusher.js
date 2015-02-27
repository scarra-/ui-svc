/**
 * Created by Karl on 2/27/2015.
 */



Pusher.log = function(message) {
    if (window.console && window.console.log) {
        window.console.log(message);
    }
};

var pusher = new Pusher('7b0cc00ab6716c7191b4');
var channel = pusher.subscribe('test_channel');
channel.bind('my_event', function(data) {
    console.error(data.message);
});